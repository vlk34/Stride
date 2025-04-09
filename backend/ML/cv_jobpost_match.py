import os
import io
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"
import resume
import psycopg2
from psycopg2.extras import RealDictCursor
import torch
from transformers import AutoModel, AutoTokenizer
from sklearn.metrics.pairwise import cosine_similarity
from fastapi import FastAPI, APIRouter
from fastapi import UploadFile, File
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

router = APIRouter()

DB_HOST = "localhost"
DB_NAME = "java project"
DB_USER = "postgres"
DB_PASSWORD = "rootadmin1"  # Replace with your actual password
DB_PORT = "5432"

def get_db_connection():
    """Create and return a PostgreSQL database connection."""
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            port=DB_PORT,
            cursor_factory=RealDictCursor  # Returns results as dictionaries
        )
        return conn
    except Exception as e:
        print(f"Database connection error: {e}")
        return None

def load_model():
    """Load the transformer model and tokenizer, and set up the device."""
    device = "cuda" if torch.cuda.is_available() else "cpu"
    save_path = "C:/Users/mekin/OneDrive/Desktop/java/resume-match-bert"
    tokenizer = AutoTokenizer.from_pretrained(save_path)
    model = AutoModel.from_pretrained(save_path)
    model.to(device)
    return model, tokenizer, device

def get_embedding(text, model, tokenizer, device):
    """Get mean-pooled embedding for the input text."""
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True).to(device)
    with torch.no_grad():
        outputs = model(**inputs)
    # Mean pooling over the token embeddings
    embedding = outputs.last_hidden_state.mean(dim=1).detach().cpu().numpy()
    return embedding

def calculate_match(resume_text, job_text):
    """Calculate the match percentage between a resume and a job text."""
    model, tokenizer, device = load_model()
    
    # Generate embeddings
    resume_embedding = get_embedding(resume_text, model, tokenizer, device)
    job_embedding = get_embedding(job_text, model, tokenizer, device)

    # Compute cosine similarity
    similarity = cosine_similarity(resume_embedding, job_embedding)[0][0]
    match_percentage = similarity * 100
    
    return similarity, match_percentage

class ApplicationID(BaseModel):
    application_id: int

@router.post("/match-resume-job")
async def match_resume_job(request: ApplicationID):
    """
    Match a resume with a job description, qualifications, and responsibilities based on application ID.
    
    This endpoint:
      1. Retrieves the resume byte data from the database.
      2. Loads the byte data into a file-like object.
      3. Extracts and cleans the resume text from the file-like object.
      4. Fetches job details (job description, qualifications, responsibilities) and concatenates them.
      5. Calculates the similarity between the resume text and the combined job text.
      6. Updates the similarity score in the database.
    """
    conn = get_db_connection()
    if not conn:
        return {"error": "Database connection failed"}
    
    cursor = conn.cursor()
    
    # Fetch resume bytes and job details using the provided application ID.
    cursor.execute("""
        SELECT a.application_id, r.cv AS resume_bytes, 
               j.job_description, j.qualifications, j.responsibilities
        FROM applications a
        JOIN jobs j ON a.job_id = j.job_id
        JOIN resumes r ON a.cv = r.id
        WHERE a.application_id = %s
    """, (request.application_id,))
    result = cursor.fetchone()
    
    if not result:
        cursor.close()
        conn.close()
        return {"error": "No data found for the given application ID"}
    
    # Load the resume byte array into a file-like object and extract text.
    resume_file_like = io.BytesIO(result['resume_bytes'])
    resume_text = resume.get_cleaned_resume(resume_file_like)
    
    # Concatenate job description, qualifications, and responsibilities.
    job_text = f"{result['job_description']} {result['qualifications']} {result['responsibilities']}"
    
    # Calculate the similarity and match percentage.
    similarity, match_percentage = calculate_match(resume_text, job_text)
    
    # Convert numpy.float32 to native float for psycopg2.
    match_percentage = float(match_percentage)
    similarity = float(similarity)
    
    # Update the similarity column in the applications table using the application_id.
    cursor.execute("UPDATE applications SET similarity = %s WHERE application_id = %s", (match_percentage, request.application_id))
    conn.commit()

    cursor.close()
    conn.close()
    
    return {
        "similarity": similarity,
        "match_percentage": match_percentage
    }
