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


job_vector_store = FAISS.load_local(
    "cmpe356/backend/ML/jobs_index", embeddings_model, allow_dangerous_deserialization=True
)

docs = job_vector_store.similarity_search("i was working as a Machine learning intern")

pprint(docs[:3])