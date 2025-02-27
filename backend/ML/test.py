import json
from pathlib import Path
from pprint import pprint
from langchain_community.document_loaders import JSONLoader
from langchain_huggingface import HuggingFaceEmbeddings
import faiss
from langchain_community.docstore.in_memory import InMemoryDocstore
from langchain_community.vectorstores import FAISS
from uuid import uuid4
import os
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

embeddings_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2")

file_path = 'cmpe356/backend/ML/jobs.json'

# Correct jq_schema for direct array access
loader = JSONLoader(
    file_path=file_path,
    jq_schema='.[]',
    text_content=False
)

data = loader.load()

index = faiss.IndexFlatL2(len(embeddings_model.embed_query("hello world")))

vector_store = FAISS(
    embedding_function=embeddings_model,
    index=index,
    docstore=InMemoryDocstore(),
    index_to_docstore_id={},
)

uuids = [str(uuid4()) for _ in range(len(data))]

vector_store.add_documents(documents=data, document_ids=uuids)


vector_store.save_local("jobs_index")

job_vector_store = FAISS.load_local(
    "jobs_index", embeddings_model, allow_dangerous_deserialization=True
)

docs = vector_store.similarity_search("i am a front end developer using curently have 2 years of experience from İstanbul")

pprint(docs[:3])