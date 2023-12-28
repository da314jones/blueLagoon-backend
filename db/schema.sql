-- Drop the existing database if it exists to start fresh
DROP DATABASE IF EXISTS bluelagoon_dev;

-- Create a new database for the application
CREATE DATABASE bluelagoon_dev;

-- Connect to the newly created database
\c bluelagoon_dev;

-- Users seed data (1 admin and 6 generic users)
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    password_hash VARCHAR(255),
    date_of_birth DATE,
    is_age_verified BOOLEAN DEFAULT false,
    account_status VARCHAR(50) DEFAULT 'active',
    phone_number VARCHAR(15) UNIQUE,
    profile_pic TEXT,
    interests TEXT,
    challenges TEXT,
    experiences TEXT,
    locations VARCHAR(100),
    join_date DATE,
    role VARCHAR(50),
    last_login TIMESTAMP,
    reset_token VARCHAR(255)
);

--Registrations Table
CREATE TABLE registrations (
    registration_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    email VARCHAR(255),
    registration_started TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    initial_data JSONB,
    registration_token UUID,
    token_expiration TIMESTAMP,
    additional_info TEXT,
    verification_process VARCHAR(255),
    agree_to_terms_of_service BOOLEAN
);

--Security Table
CREATE TABLE security (
    security_id SERIAL PRIMARY KEY,
    user_id INT UNIQUE NOT NULL REFERENCES users(user_id),
    email_verified BOOLEAN DEFAULT false,
    phone_verified BOOLEAN DEFAULT false,
    phone_verification_code VARCHAR(6),
    two_factor_enabled BOOLEAN DEFAULT false,
    last_login TIMESTAMP
);

--Profiles Table
CREATE TABLE profiles (
    profile_id SERIAL PRIMARY KEY,
    user_id INT UNIQUE NOT NULL REFERENCES users(user_id),
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    gender VARCHAR(50),
    profile_picture_url TEXT,
    bio TEXT,
    location VARCHAR(100)
);

--VChats Table
CREATE TABLE vchats (
    session_id SERIAL PRIMARY KEY,
    host_user_id INTEGER REFERENCES users(user_id),
    opentok_session_id VARCHAR(255),
    video_url TEXT,
    schedule_time TIMESTAMP,
    duration INTEGER,
    archive_link TEXT,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    archive_url TEXT
);

--VThreads Table
CREATE TABLE vthreads (
    thread_id SERIAL PRIMARY KEY,
    host_user_id INTEGER REFERENCES users(user_id),
    title VARCHAR(255),
    description TEXT,
    video_url TEXT,
    scheduled_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    duration INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--Chat Messages Table
CREATE TABLE chat_messages (
    message_id SERIAL PRIMARY KEY,
    thread_id INTEGER REFERENCES vthreads(thread_id),
    user_id INTEGER REFERENCES users(user_id),
    message TEXT,
    timestamp TIMESTAMP
);

--Notifications Table
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    type VARCHAR(50),
    message TEXT,
    date TIMESTAMP
);

--Groups Table
CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    group_name VARCHAR(100),
    description TEXT,
    creation_date DATE
);

--User Groups Table
CREATE TABLE user_groups (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    group_id INTEGER REFERENCES groups(id),
    join_date DATE
);

--Events Table
CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    location VARCHAR(255),
    date DATE,
    time TIME,
    capacity INT,
    organizer VARCHAR(255),
    category VARCHAR(255),
    contact_email VARCHAR(255),
    sign_up_link TEXT
);

--Resources Table
CREATE TABLE resources (
    resource_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    type VARCHAR(50),
    link TEXT,
    location_based BOOLEAN,
    location VARCHAR(255)
);

--Professional VChats Table
CREATE TABLE professional_vchats (
    vchat_id SERIAL PRIMARY KEY,
    topic VARCHAR(255),
    creator VARCHAR(255),
    industry VARCHAR(255),
    credentials TEXT,
    date DATE,
    time TIME,
    video_url TEXT,
    is_live BOOLEAN,
    archived BOOLEAN,
    archive_link TEXT
);

--Professional VThreads Table
CREATE TABLE professional_vthreads (
    vthread_id SERIAL PRIMARY KEY,
    topic VARCHAR(255),
    creator VARCHAR(255),
    industry VARCHAR(255),
    credentials TEXT,
    date DATE,
    time TIME,
    discussion_url TEXT,
    is_active BOOLEAN,
    archived BOOLEAN,
    archive_link TEXT
);

--Social Media Accounts Table
CREATE TABLE social_media_accounts (
    account_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    social_media_platform VARCHAR(50),
    social_media_id VARCHAR(255),
    profile_url TEXT,
    connected_on TIMESTAMP
);

--Connections Table
CREATE TABLE connections (
    connection_id SERIAL PRIMARY KEY,
    user1_id INT REFERENCES users(user_id),
    user2_id INT REFERENCES users(user_id),
    connection_on TIMESTAMP
);

--Recommendations Table
CREATE TABLE recommendations (
    recommendation_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    title VARCHAR(255),
    description TEXT,
    link TEXT,
    recommended_on TIMESTAMP
);

--Affiliates Table
CREATE TABLE affiliates (
    affiliate_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    service_or_product VARCHAR(100),
    discount_details TEXT,
    contact_info TEXT
);

--Mentorships Table
CREATE TABLE mentorships (
    mentorship_id SERIAL PRIMARY KEY,
    mentor_id INT REFERENCES users(user_id),
    mentee_id INT REFERENCES users(user_id),
    start_date DATE,
    end_date DATE,
    status VARCHAR(50),
    notes TEXT
);

--Reviews Table
CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    event_id INT REFERENCES events(event_id),
    rating INT,
    comment TEXT,
    created_at TIMESTAMP
);

--Reports Table
CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    reported_by_user_id INTEGER REFERENCES users(user_id),
    reported_user_id INTEGER REFERENCES users(user_id),
    content TEXT,
    report_date TIMESTAMP
);

--Emergency Contacts Table
CREATE TABLE emergency_contacts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    name VARCHAR(255),
    contact_info TEXT,
    description TEXT,
    location VARCHAR(255)
);

--Legal Documents Table
CREATE TABLE legal_documents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    document_type VARCHAR(50),
    content TEXT,
    effective_date DATE
);

--User Consent Logs Table
CREATE TABLE consent_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    document_id INTEGER REFERENCES legal_documents(id),
    consent_date TIMESTAMP,
    version INT
);

--Error Logs Table
CREATE TABLE error_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    log_type VARCHAR(50),
    error_message TEXT,
    error_details JSON,
    log_date TIMESTAMP
);