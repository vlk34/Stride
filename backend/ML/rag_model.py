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

def generate_sql_result(user_input: str):
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
    db = SQLDatabase.from_uri("postgresql://postgres:rootadmin1@localhost:5432/java project")

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
