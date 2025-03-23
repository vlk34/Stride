import json
import psycopg2
from psycopg2.extras import execute_values
import random

# Database connection parameters
DB_PARAMS = {
    "host": "localhost",
    "database": "java project",
    "user": "postgres",
    "password": "",
    "port": "5432"
}

def load_json(file_path):
    """Load data from JSON file"""
    with open(file_path, 'r', encoding='utf-8') as file:
        return json.load(file)

def transform_jobs_data(jobs_data):
    """Transform jobs data to match database schema with random company IDs"""
    transformed_jobs = []
    
    for job in jobs_data:
        # Convert responsibilities array to text if it exists
        responsibilities = ""
        if 'responsibilities' in job and isinstance(job['responsibilities'], list):
            responsibilities = "\n- ".join(job.get('responsibilities', []))
            if responsibilities:
                responsibilities = "- " + responsibilities
        
        # Assign random company_id between 1 and 100
        company_id = random.randint(1, 100)
            
        transformed_job = {
            'company_id': company_id,
            'title': job.get('title', 'Unnamed Position'),
            'job_location': job.get('location', ''),
            'type': job.get('type', ''),
            'overview': job.get('overview', ''),
            'responsibilities': responsibilities,
        }
        
        transformed_jobs.append(transformed_job)
    
    return transformed_jobs

def insert_jobs(conn, cursor, transformed_jobs):
    """Insert transformed jobs into the database"""
    insert_query = """
    INSERT INTO jobs (company_id, title, job_location, type, overview, responsibilities)
    VALUES %s
    RETURNING job_id;
    """
    
    # Prepare data for batch insert
    job_data = [
        (
            job['company_id'],
            job['title'],
            job['job_location'],
            job['type'],
            job['overview'],
            job['responsibilities']
        )
        for job in transformed_jobs
    ]
    
    # Execute batch insert
    try:
        execute_values(cursor, insert_query, job_data)
        inserted_ids = [row[0] for row in cursor.fetchall()]
        conn.commit()
        return inserted_ids
    except Exception as e:
        conn.rollback()
        print(f"Error inserting jobs: {e}")
        return []

def main():
    # Load jobs data from JSON file
    json_file_path = "c:\\Users\\mekin\\OneDrive\\Desktop\\java\\cmpe356\\backend\\ML\\jobs.json"
    jobs_data = load_json(json_file_path)
    print(f"Loaded {len(jobs_data)} jobs from JSON file")
    
    # Connect to the database
    conn = psycopg2.connect(**DB_PARAMS)
    cursor = conn.cursor()
    
    try:
        # Transform jobs data with random company IDs
        transformed_jobs = transform_jobs_data(jobs_data)
        print(f"Transformed {len(transformed_jobs)} jobs")
        
        # Insert jobs
        inserted_job_ids = insert_jobs(conn, cursor, transformed_jobs)
        print(f"Successfully inserted {len(inserted_job_ids)} jobs")
        
    except Exception as e:
        print(f"Error: {e}")
    finally:
        cursor.close()
        conn.close()
        print("Database connection closed")

if __name__ == "__main__":
    main()