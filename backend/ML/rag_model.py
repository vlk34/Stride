from langchain_huggingface import HuggingFaceEmbeddings
import torch
from langchain_community.docstore.in_memory import InMemoryDocstore
from langchain_community.vectorstores import FAISS
from langchain_core.documents import Document
from langchain_core.prompts import FewShotPromptTemplate, PromptTemplate



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

query = "computer science"

retriever = vector_store.as_retriever(search_type="mmr", search_kwargs={"k": 3})
docs = retriever.invoke(query)




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

prompt = FewShotPromptTemplate(
    examples=examples,
    example_prompt=example_prompt,
    prefix="You are a SQLite expert. Given an input question, create a syntactically correct SQLite query to run. Unless otherwise specificed, do not return more than {top_k} rows.\n\nHere is the relevant table info: {table_info}\n\nBelow are a number of examples of questions and their corresponding SQL queries.",
    suffix="User input: {input}\nSQL query: ",
    input_variables=["input", "top_k", "table_info"],
)

print(prompt.format(input=query, top_k=2, table_info="foo"))

