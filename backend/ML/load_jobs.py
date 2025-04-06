import json
import psycopg2
from psycopg2.extras import execute_values
import random
from datetime import datetime, timedelta

# Database connection parameters
DB_PARAMS = {
    "host": "localhost",
    "database": "java project",
    "user": "postgres",
    "password": "rootadmin1",  # Replace with your actual password
    "port": "5432"
}

def load_json(file_path):
    """Load data from JSON file"""
    with open(file_path, 'r', encoding='utf-8') as file:
        return json.load(file)

def transform_jobs_data(jobs_data):
    """Transform jobs data to match database schema"""
    transformed_jobs = []

    for job in jobs_data:
        responsibilities = ""
        if isinstance(job.get('responsibilities'), list):
            responsibilities = "\n- ".join(job['responsibilities'])
            if responsibilities:
                responsibilities = "- " + responsibilities

        qualifications = ""
        if isinstance(job.get('qualifications'), list):
            qualifications = "\n- ".join(job['qualifications'])
            if qualifications:
                qualifications = "- " + qualifications

        transformed_job = {
            'company_id': random.randint(1, 100),
            'title': job.get('title', 'Unnamed Position'),
            'department': job.get('department', 'General'),
            'job_location': job.get('location', ''),
            'job_type': job.get('type', 'Full-time'),
            'workstyle': job.get('workstyle', 'Hybrid'),
            'skills': job.get('skills', []),
            'languages': job.get('languages', []),
            'experience': job.get('experience', 'Not specified'),
            'education': job.get('education', 'Not specified'),
            'responsibilities': responsibilities,
            'qualifications': qualifications,
            'job_description': job.get('overview', ''),
            'closes_at': datetime.now() + timedelta(days=random.randint(10, 60)),
            'openings': job.get('openings', random.randint(1, 5))
        }

        transformed_jobs.append(transformed_job)

    return transformed_jobs

def insert_jobs(conn, cursor, transformed_jobs):
    """Insert transformed jobs into the database"""
    insert_query = """
    INSERT INTO jobs (
        company_id, title, department, job_location, job_type,
        workstyle, skills, languages, experience, education,
        responsibilities, qualifications, job_description,
        closes_at, openings
    )
    VALUES %s
    RETURNING job_id;
    """

    job_data = [
        (
            job['company_id'],
            job['title'],
            job['department'],
            job['job_location'],
            job['job_type'],
            job['workstyle'],
            job['skills'],
            job['languages'],
            job['experience'],
            job['education'],
            job['responsibilities'],
            job['qualifications'],
            job['job_description'],
            job['closes_at'],
            job['openings']
        )
        for job in transformed_jobs
    ]

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
    json_file_path = "c:\\Users\\mekin\\OneDrive\\Desktop\\java\\cmpe356\\backend\\ML\\jobs.json"
    jobs_data = load_json(json_file_path)
    print(f"Loaded {len(jobs_data)} jobs from JSON file")

    conn = psycopg2.connect(**DB_PARAMS)
    cursor = conn.cursor()

    try:
        transformed_jobs = transform_jobs_data(jobs_data)
        print(f"Transformed {len(transformed_jobs)} jobs")

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
