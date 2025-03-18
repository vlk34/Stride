from langchain_huggingface import HuggingFaceEmbeddings
import torch
from langchain_community.docstore.in_memory import InMemoryDocstore
from langchain_community.vectorstores import FAISS
from langchain_core.documents import Document


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

new_vector_store = FAISS.load_local(
    "faiss_index", embeddings, allow_dangerous_deserialization=True
)