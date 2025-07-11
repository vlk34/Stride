CREATE TABLE IF NOT EXISTS images (
    id SERIAL PRIMARY KEY,
    img BYTEA NOT NULL,
    content VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS resumes (
    id SERIAL PRIMARY KEY,
    cv BYTEA NOT NULL,
    content VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS companies (
    company_id SERIAL PRIMARY KEY,
	user_id VARCHAR(255) UNIQUE NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    company_location VARCHAR(255) NOT NULL,
    industry VARCHAR(255) NOT NULL,
    company_size VARCHAR(255) NOT NULL,
    logo INTEGER NOT NULL,
    founded INTEGER NOT NULL,
    email VARCHAR(255) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    about TEXT NOT NULL,
    phone VARCHAR(255) NOT NULL,
    website VARCHAR(255) NOT NULL,
    company_country VARCHAR(255) NOT NULL,
    company_city VARCHAR(255) NOT NULL,
    company_state VARCHAR(255) NOT NULL,
    postal_code VARCHAR(255) NOT NULL,
    mission VARCHAR(255) NOT NULL,
    benefits VARCHAR(255) NOT NULL,
    FOREIGN KEY (logo) REFERENCES images(id)
);

CREATE TABLE IF NOT EXISTS jobs (
    job_id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    job_location VARCHAR(255) NOT NULL,
    job_type VARCHAR(255) NOT NULL,
	workstyle VARCHAR(255) NOT NULL,
    skills TEXT[],
    languages TEXT[],
    experience VARCHAR(255) NOT NULL,
    education VARCHAR(255) NOT NULL,
    responsibilities VARCHAR(255) NOT NULL,
    qualifications VARCHAR(255) NOT NULL,
    job_description TEXT NOT NULL,
    closes_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    openings INTEGER NOT NULL,
    FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS saved (
    save_id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    job_id INTEGER NOT NULL,
    UNIQUE (user_id, job_id),
    FOREIGN KEY (job_id) REFERENCES jobs(job_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS applications (
    application_id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    job_id INTEGER NOT NULL,
    cv INTEGER NOT NULL,
    similarity FLOAT,
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, job_id),
    FOREIGN KEY (cv) REFERENCES resumes(id),
    FOREIGN KEY (job_id) REFERENCES jobs(job_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS business_applications (
    application_id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) UNIQUE NOT NULL,
    company_id INTEGER UNIQUE NOT NULL,
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS notifications (
    notification_id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
    message_id SERIAL PRIMARY KEY,
    sender_id VARCHAR(255) NOT NULL,
    receiver_id VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS activities (
    activity_id SERIAL PRIMARY KEY,
    activity VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    event_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
