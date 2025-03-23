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



db = SQLDatabase.from_uri("postgresql://postgres:rootadmin1@localhost:5432/java project" )
print(db.dialect)



if not os.environ.get("STRIDE_OPENAI"):
    print("OPENAI_API_KEY not found.")
    exit()


llm = init_chat_model("gpt-4o-mini", model_provider="openai")

print( "cuda avaliable:" + str(torch.cuda.is_available()))

# Check CUDA availability
device = "cuda" if torch.cuda.is_available() else "cpu"

# Explicitly set device
model_kwargs = {'device': device}

print(f"Using device: {device}")

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-mpnet-base-v2",
    model_kwargs=model_kwargs
)

vector_store = FAISS.load_local(
    "faiss_index", embeddings, allow_dangerous_deserialization=True
)

input = "computer science"

retriever = vector_store.as_retriever(search_type="mmr", search_kwargs={"k": 5})
docs = retriever.invoke(input)




examples = []
for doc in docs:
    # Extract metadata and content
    content = doc.page_content
    metadata = doc.metadata
    
    # Create input from content
    
    
    # Get SQL query from metadata
    query = metadata.get('sql_query')
    
    # Create example dictionary
    example = {
        "input": content,
        "query": query
    }
    
    examples.append(example)

print(examples)

example_prompt = PromptTemplate.from_template("User input: {input}\nSQL query: {query}")


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

# Corrected prompt for PostgreSQL
prompt = FewShotPromptTemplate(
    examples=examples,
    example_prompt=example_prompt,
    prefix="You are a PostgreSQL expert. Given an input question, create a syntactically correct PostgreSQL query to run. Unless otherwise specified, do not return more than {top_k} rows.\n\nHere is the relevant table info: {table_info}\n\nBelow are a number of examples of questions and their corresponding SQL queries.",
    suffix="User input: {input}\nSQL query: ",
    input_variables=["input", "top_k", "table_info"],
)

print(prompt.format(input=input, top_k=5, table_info=table_info))

chain = create_sql_query_chain(llm, db, prompt)

result = chain.invoke({"question": input})

print(result)



