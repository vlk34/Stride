import os
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"
import resume
import psycopg2
from psycopg2.extras import RealDictCursor
import torch
from transformers import AutoModel, AutoTokenizer
from sklearn.metrics.pairwise import cosine_similarity
from fastapi import FastAPI
from pydantic import BaseModel



app = FastAPI()


DB_HOST = "localhost"
DB_NAME = "java project"
DB_USER = "postgres"
DB_PASSWORD = "rootadmin1"  # Replace with your actual password
DB_PORT = "5432"

def get_db_connection():
    """Create and return a PostgreSQL database connection"""
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
    # Set up device and load the saved model and tokenizer
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

def calculate_match(resume_text, job_description_text):
    """Calculate the match percentage between a resume and job description."""
    model, tokenizer, device = load_model()
    
    # Generate embeddings
    resume_embedding = get_embedding(resume_text, model, tokenizer, device)
    job_embedding = get_embedding(job_description_text, model, tokenizer, device)

    # Compute cosine similarity
    similarity = cosine_similarity(resume_embedding, job_embedding)[0][0]
    match_percentage = similarity * 100
    
    return similarity, match_percentage


class Application_id(BaseModel):
    application_id: int

@app.post("/match-resume-job")
async def match_resume_job(request: Application_id):
    """Match a resume with a job description based on application ID."""
    conn = get_db_connection()
    if not conn:
        return {"error": "Database connection failed"}
    
    cursor = conn.cursor()
    
    # Fetch resume and job description from the database using the application ID
    cursor.execute("SELECT resume, job_description FROM applications WHERE id = %s", (request.application_id,))
    result = cursor.fetchone()
    
    if not result:
        return {"error": "No data found for the given application ID"}
    
    resume_text = resume.get_cleaned_resume(result['resume'])
    job_description_text = result['job_description']
    
    # Calculate match percentage
    similarity, match_percentage = calculate_match(resume_text, job_description_text)
    
    cursor.execute("UPDATE applications SET match_percentage = %s WHERE id = %s", (match_percentage, request.application_id))
    conn.commit()


    # Close the database connection
    cursor.close()
    conn.close()
    
    #no need
    return {
        "similarity": similarity,
        "match_percentage": match_percentage
    }
    

