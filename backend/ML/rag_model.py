from langchain_huggingface import HuggingFaceEmbeddings
import torch
from langchain_community.docstore.in_memory import InMemoryDocstore
from langchain_community.vectorstores import FAISS
from langchain_core.documents import Document
from langchain_core.prompts import FewShotPromptTemplate, PromptTemplate
import os
from langchain.chat_models import init_chat_model
from langchain.chains import create_sql_query_chain
from langchain_community.utilities import SQLDatabase
from langchain_community.tools.sql_database.tool import QuerySQLDatabaseTool
from langchain import hub
from langchain_core.messages import HumanMessage
from langgraph.prebuilt import create_react_agent
import json



if not os.environ.get("STRIDE_OPENAI"):
    raise EnvironmentError("OPENAI_API_KEY not found.")
# Init LLM
llm = init_chat_model("gpt-4o-mini", model_provider="openai")
# Device check
device = "cuda" if torch.cuda.is_available() else "cpu"
model_kwargs = {'device': device}
# Load Embeddings and FAISS vector store
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-mpnet-base-v2",
    model_kwargs=model_kwargs
)
vector_store = FAISS.load_local(
    "C:/Users/mekin/OneDrive/Desktop/java/faiss_index", embeddings, allow_dangerous_deserialization=True
)
# Retrieve relevant docs
retriever = vector_store.as_retriever(search_type="mmr", search_kwargs={"k": 5})

db = SQLDatabase.from_uri("postgresql://postgres:rootadmin1@localhost:5432/java project")







agent_prompt = """
You are an AI agent designed to generate SQL queries to search for jobs from the "jobs" table in a PostgreSQL database.

The user will provide either:
- A text description about themselves (skills, experience, preferences)
- or extracted information from their uploaded resume.

Your task:
1. Interpret the user's input and generate a syntactically correct PostgreSQL query that retrieves matching jobs from the "jobs" table.
2. Only select relevant columns such as: title, department, job_location, job_type, workstyle, experience, education, skills, languages, job_description.
3. Always limit your query to at most 10 results unless the user specifies otherwise.
4. Match user input to jobs using available fields such as: title, department, job_type, workstyle, skills, experience, education, or job_description.
5. If the input is too vague, generate a broader query by relaxing filters (e.g., search only by title, job_type or workstyle).
6. If the result is empty, automatically paraphrase or adjust your query by reducing or loosening the filters to find at least some results.
7. Always order results by created_at descending to show the latest jobs.
8. Never select all columns using (*).
9. Never use DML statements (INSERT, UPDATE, DELETE, DROP, etc.)!!!!!.
10. If you encounter an error while executing the query, rephrase and retry.
11. Use the tools below


You have access to this PostgreSQL table schema:

jobs(
    job_id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    job_location VARCHAR(255) NOT NULL,
    job_type VARCHAR(255) NOT NULL,
    workstyle VARCHAR(255) NOT NULL,
    skills TEXT[],
    languages TEXT[],
    experience VARCHAR(255) NOT NULL,
    education VARCHAR(255) NOT NULL,
    responsibilities VARCHAR(255) NOT NULL,
    qualifications VARCHAR(255) NOT NULL,
    job_description TEXT NOT NULL,
    closes_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    openings INTEGER NOT NULL
)

You should now generate the SQL query based on the user input.
"""




def generate_sql_result(user_input: str):

    docs = retriever.invoke(user_input)
    # Create few-shot examples
    examples = []
    for doc in docs:
        content = doc.page_content
        metadata = doc.metadata
        query = metadata.get('sql_query')
        examples.append({"input": content, "query": query})

    # Setup prompt
    example_prompt = PromptTemplate.from_template("User input: {input}/nSQL query: {query}")
    table_info = """
    TABLE jobs (
        job_id SERIAL PRIMARY KEY,
        company_id INTEGER NOT NULL,
        title VARCHAR(255) NOT NULL,
        job_location VARCHAR(255),
        type VARCHAR(255),
        overview TEXT,
        responsibilities TEXT,
        posted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    );
    """

    prompt = FewShotPromptTemplate(
        examples=examples,
        example_prompt=example_prompt,
        prefix=(
            "You are a PostgreSQL expert. Given an input question, create a syntactically correct "
            "PostgreSQL query to run. Unless otherwise specified, do not return more than {top_k} rows./n/n"
            "Here is the relevant table info: {table_info}/n/n"
            "Below are a number of examples of questions and their corresponding SQL queries."
            "Return the sql query noting else as text, nothing else."
        ),
        suffix="User input: {input}/nSQL query: ",
        input_variables=["input", "top_k", "table_info"],
    )

    print(prompt)
    # Connect DB
    

    # Create SQL chain
    chain = create_sql_query_chain(llm, db, prompt)

    # Get SQL query
    sql_query = chain.invoke({
        "question": user_input,
        "top_k": 5,
        "table_info": table_info
    })

    

    # Execute the SQL query
    execute_query_tool = QuerySQLDatabaseTool(db=db)
    result = execute_query_tool.invoke(sql_query)

    print(sql_query)
    print(result)

    return {
        "sql_query": sql_query,
        "result": result
    }


def agent_invoke(user_input: str):
    from langchain_community.agent_toolkits import SQLDatabaseToolkit

    toolkit = SQLDatabaseToolkit(db=db, llm=llm)

    tools = toolkit.get_tools()

    docs = retriever.invoke(user_input)
    # Create few-shot examples
    examples = []
    for doc in docs:
        content = doc.page_content
        metadata = doc.metadata
        query = metadata.get('sql_query')
        examples.append({"input": content, "query": query})

    
    examples_text = ""
    if examples:
        examples_text = "\n\nHere are some examples of similar inputs and their queries:\n\n"
        for i, example in enumerate(examples):
            examples_text += f"Example {i+1}:\n"
            examples_text += f"User input: {example['input']}\n"
            examples_text += f"SQL query: {example['query']}\n\n"
    
    # Integrate examples into the agent prompt
    enhanced_prompt = agent_prompt + examples_text
    print(enhanced_prompt)
    print("\n")



    agent_executor = create_react_agent(llm, tools, prompt=enhanced_prompt)



    finalstep = None
    for step in agent_executor.stream(
        {"messages": [{"role": "user", "content": user_input}]},
        stream_mode="values",
    ):
        step["messages"][-1].pretty_print()
        finalstep = step

    try:
        arguments = finalstep["messages"][-3].additional_kwargs["tool_calls"][0]["function"]["arguments"]
        arguments_dict = json.loads(arguments)
        # Access the query
        sql_query = arguments_dict["query"]
        execute_query_tool = QuerySQLDatabaseTool(db=db)
        result = execute_query_tool.invoke(sql_query)
        print("\n\n")
        print(sql_query)
        print(result)
    
        return {
            "sql_query": sql_query,
            "result": result
        }
        
    except (KeyError, IndexError, json.JSONDecodeError) as e:
        print(f"An error occurred while extracting the SQL query: {e}")


if __name__ == "__main__":
    user_input = "i am looking for a software engineer position with experience in Python and machine learning"
    # generate_sql_result(user_input)
    agent_invoke(user_input)