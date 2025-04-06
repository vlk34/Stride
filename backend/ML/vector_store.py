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


# Example Documents with structured metadata and associated SQL queries for job-related context
documents = [
    Document(
        page_content="I'm a software engineer with 2+ years of experience in Python and Django. I'm looking for a hybrid full-time position in San Francisco where I can contribute to backend development and RESTful APIs.",
        metadata={
            "sql_query": "SELECT * FROM jobs WHERE title ILIKE '%software engineer%' AND job_location ILIKE '%San Francisco%' AND job_type = 'Full-time' AND workstyle = 'Hybrid' AND ARRAY['Python', 'Django', 'REST APIs'] <@ skills;"
        }
    ),
    Document(
        page_content="I'm a civil engineer with over 3 years of experience in AutoCAD and project management. I'm seeking a full-time on-site role in Austin where I can work on infrastructure design and inspections.",
        metadata={
            "sql_query": "SELECT * FROM jobs WHERE title ILIKE '%civil engineer%' AND job_location ILIKE '%Austin%' AND job_type = 'Full-time' AND workstyle = 'On-site' AND ARRAY['AutoCAD', 'Project Management'] <@ skills;"
        }
    ),
    Document(
        page_content="I'm a data engineer who enjoys building data pipelines with SQL and Airflow. I prefer remote contract roles where I can support analytics and machine learning teams.",
        metadata={
            "sql_query": "SELECT * FROM jobs WHERE title ILIKE '%data engineer%' AND job_type = 'Contract' AND workstyle = 'Remote' AND ARRAY['SQL', 'ETL', 'Airflow'] <@ skills;"
        }
    ),
    Document(
        page_content="I'm a mechanical engineer experienced in CAD and prototyping. I'm interested in a full-time on-site role in Detroit focused on designing components for automotive R&D.",
        metadata={
            "sql_query": "SELECT * FROM jobs WHERE title ILIKE '%mechanical engineer%' AND job_location ILIKE '%Detroit%' AND job_type = 'Full-time' AND workstyle = 'On-site' AND ARRAY['CAD', 'Prototyping'] <@ skills;"
        }
    ),
    Document(
        page_content="As an electrical engineer with 3+ years of experience in circuit design and embedded systems, I'm looking for a hybrid role in Boston to contribute to high-tech medical devices.",
        metadata={
            "sql_query": "SELECT * FROM jobs WHERE title ILIKE '%electrical engineer%' AND job_location ILIKE '%Boston%' AND job_type = 'Full-time' AND workstyle = 'Hybrid' AND ARRAY['Circuit Design', 'PCB Layout'] <@ skills;"
        }
    ),
    Document(
        page_content="I'm a marketing manager with over 5 years of experience in SEO and brand strategy. I'm looking for a hybrid full-time opportunity in New York to lead digital campaigns.",
        metadata={
            "sql_query": "SELECT * FROM jobs WHERE title ILIKE '%marketing manager%' AND job_location ILIKE '%New York%' AND job_type = 'Full-time' AND workstyle = 'Hybrid' AND ARRAY['SEO', 'Brand Strategy'] <@ skills;"
        }
    ),
    Document(
        page_content="I’m a creative graphic designer proficient in Photoshop, Illustrator, and Figma. I’m seeking a part-time remote position where I can help shape brand visuals and social content.",
        metadata={
            "sql_query": "SELECT * FROM jobs WHERE title ILIKE '%graphic designer%' AND job_type = 'Part-time' AND workstyle = 'Remote' AND ARRAY['Photoshop', 'Illustrator', 'Figma'] <@ skills;"
        }
    ),
    Document(
        page_content="I'm a bilingual customer support specialist fluent in English and Spanish. I’m looking for a remote full-time role where I can resolve customer inquiries using tools like Zendesk.",
        metadata={
            "sql_query": "SELECT * FROM jobs WHERE title ILIKE '%customer support%' AND job_type = 'Full-time' AND workstyle = 'Remote' AND ARRAY['English', 'Spanish'] <@ languages;"
        }
    ),
    Document(
        page_content="As a UX researcher with 3+ years of experience in user interviews and persona building, I’m looking for a full-time hybrid role in Seattle to help improve product usability.",
        metadata={
            "sql_query": "SELECT * FROM jobs WHERE title ILIKE '%UX researcher%' AND job_location ILIKE '%Seattle%' AND job_type = 'Full-time' AND workstyle = 'Hybrid' AND ARRAY['User Interviews', 'Persona Building'] <@ skills;"
        }
    ),
    Document(
        page_content="I'm a data scientist with a master's degree and 3+ years of experience in machine learning and Python. I'm looking for a remote full-time job where I can build predictive models.",
        metadata={
            "sql_query": "SELECT * FROM jobs WHERE title ILIKE '%data scientist%' AND job_type = 'Full-time' AND workstyle = 'Remote' AND ARRAY['Python', 'Machine Learning'] <@ skills;"
        }
    ),
]

vector_store.add_documents(documents=documents,)


vector_store.save_local("faiss_index")

