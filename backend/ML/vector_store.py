from langchain_huggingface import HuggingFaceEmbeddings
import torch
from langchain_core.documents import Document
import faiss
from langchain_community.docstore.in_memory import InMemoryDocstore
from langchain_community.vectorstores import FAISS
from uuid import uuid4



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

size = len(embeddings.embed_query("hello world"))

index = faiss.IndexFlatL2(size)
print("vector size: ", size)

vector_store = FAISS(
    embedding_function=embeddings,
    index=index,
    docstore=InMemoryDocstore(),
    index_to_docstore_id={},
)




documents = [
    Document(
        page_content="I'm a software developer with over 3 years of experience in Node.js and React. I'm passionate about building responsive web applications and prefer working in collaborative teams.",
        metadata={"id": "1", "location": "New York", "field": "software", "type": "full-time"}
    ),
    Document(
        page_content="I'm a data scientist specializing in natural language processing and deep learning. I enjoy working remotely and am seeking flexible working hours to balance my research projects.",
        metadata={"id": "2", "location": "Remote", "field": "AI", "type": "full-time"}
    ),
    Document(
        page_content="As an HR manager with 5+ years of experience, I have successfully managed recruitment and employee relations. I'm looking to continue my career in a vibrant office environment in San Francisco.",
        metadata={"id": 3, "location": "San Francisco", "field": "HR", "type": "on-site"}
    ),
    Document(
        page_content="I'm a marketing coordinator skilled in social media management and content creation. I prefer part-time opportunities where I can contribute to innovative online campaigns.",
        metadata={"id": 4, "location": "Chicago", "field": "Marketing", "type": "part-time"}
    ),
    Document(
        page_content="As a financial analyst based in London, my strengths include advanced Excel skills and comprehensive knowledge of financial markets. I'm seeking a full-time role to leverage my analytical abilities.",
        metadata={"id": 5, "location": "London", "field": "Finance", "type": "full-time"}
    ),
    Document(
        page_content="I'm a cybersecurity specialist with extensive experience in protecting digital assets and conducting penetration testing. I prefer remote work opportunities that offer contract-based employment.",
        metadata={"id": 6, "location": "Remote", "field": "Cybersecurity", "type": "contract"}
    ),
    Document(
        page_content="I am a UI/UX designer passionate about creating user-centered designs and proficient with Figma. I'm looking to join a creative design team in Austin for a full-time position.",
        metadata={"id": 6, "location": "Austin", "field": "Design", "type": "full-time"}
    ),
    Document(
        page_content="As a database administrator, I specialize in PostgreSQL and Elasticsearch, ensuring databases run efficiently and securely. I prefer full-time remote positions that offer technical challenges.",
        metadata={"id": 7, "location": "Remote", "field": "Database", "type": "full-time"}
    ),
    Document(
        page_content="I am a cybersecurity expert experienced in penetration testing and security assessments. I'm seeking hybrid or remote roles where I can apply my expertise on flexible, contract terms.",
        metadata={"id": 8, "location": "Hybrid", "field": "Cybersecurity", "type": "contract"}
    ),
    Document(
        page_content="I'm a business student looking for an analyst internship opportunity in Toronto. I'm eager to apply my academic knowledge to real-world business challenges and learn in a professional setting.",
        metadata={"id": 9, "location": "Toronto", "field": "Business", "type": "internship"}
    ),
]


vector_store.add_documents(documents=documents,)


vector_store.save_local("faiss_index")

