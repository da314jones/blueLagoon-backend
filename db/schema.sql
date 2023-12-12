-- Drop the existing database if it exists to start fresh
DROP DATABASE IF EXISTS bluelagoon_dev;

-- Create a new database for the application
CREATE DATABASE bluelagoon_dev;

-- Connect to the newly created database
\c bluelagoon_dev;


-- Define the 'users' table with user-related information
-- schema.sql

-- Create the 'users' table
-- Users Table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
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
    last_login TIMESTAMP
);

-- Create the 'user_registrations' table
CREATE TABLE user_registrations (
  registration_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  email varchar(255),
  registration_started TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  initial_data JSONB,
  registration_token UUID,
  token_expiration TIMESTAMP,
  additional_info TEXT,
  verification_process varchar(255),
  agree_to_terms_of_service BOOLEAN
);

-- Create the 'user_security' table
CREATE TABLE user_security (
    security_id SERIAL PRIMARY KEY,
    user_id INT UNIQUE NOT NULL REFERENCES users(id),
    email_verified BOOLEAN DEFAULT false,
    phone_verified BOOLEAN DEFAULT false,
    phone_verification_code VARCHAR(6),
    two_factor_enabled BOOLEAN DEFAULT false,
    last_login TIMESTAMP
);

-- Create the 'profiles' table
CREATE TABLE profiles (
    profile_id SERIAL PRIMARY KEY,
    user_id INT UNIQUE NOT NULL REFERENCES users(id),
    name VARCHAR(100),
    gender VARCHAR(50),
    profile_picture_url TEXT,
    bio TEXT,
    location VARCHAR(100)
);

-- Define the 'vchat' table for video chat sessions
CREATE TABLE vchats (
    session_id SERIAL PRIMARY KEY,
    host_user_id INTEGER REFERENCES users(user_id),
    video_url TEXT,
    schedule_time TIMESTAMP,
    duration INTEGER,
    archive_link TEXT,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    archive_url TEXT
);

-- Define the 'vthreads' table for video threads
CREATE TABLE vthreads (
    thread_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),  -- Link to the user who created the thread
    video_url TEXT,  -- URL to the video in the thread
    title VARCHAR(255),  -- Title of the video thread
    category VARCHAR(100),  -- Category of the video thread
    creation_date DATE  -- Date the thread was created
);

CREATE TABLE participants (
    participant_id SERIAL PRIMARY KEY,
    session_id INTEGER REFERENCES video_sessions(session_id),
    user_id INTEGER REFERENCES users(user_id),
    join_time TIMESTAMP ,
    leave_time TIMESTAMP
);

-- Chat Messages Table
CREATE TABLE chat_messages (
    message_id SERIAL PRIMARY KEY,
    session_id INTEGER REFERENCES vchats(session_id),
    user_id INTEGER REFERENCES users(user_id),
    message TEXT,
    timestamp TIMESTAMP
);

-- Define the 'notifications' table for user notifications
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,  -- Unique identifier for each notification
  user_id INTEGER REFERENCES users(id),  -- Link to the user receiving the notification
  type varchar(50),  -- Type of notification (e.g., alert, message)
  message TEXT,  -- Notification message content
  date timestamp  -- Date and time the notification was sent
);

-- Define the 'groups' table for user groups
CREATE TABLE groups (
  id SERIAL PRIMARY KEY,  -- Unique identifier for each group
  group_name varchar(100),  -- Name of the group
  description TEXT,  -- Description of the group
  creation_date DATE  -- Date the group was created
);

-- Define the 'user_groups' table to link users with groups
CREATE TABLE user_groups (
  id SERIAL PRIMARY KEY,  -- Unique identifier for each user-group association
  user_id INTEGER REFERENCES users(id),  -- Link to the user
  group_id INTEGER REFERENCES groups(id),  -- Link to the group
  join_date DATE  -- Date the user joined the group
);

-- Define the 'events' table for events in the application
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title varchar(255),
  description TEXT,
  location varchar(100),
  date DATE,
  time Time,
  capacity integer,
  organizer varchar(255),
  category varchar(100),
  contact_email VARCHAR(255),
  sign_up_link TEXT
);


-- Define the 'resources' table for various resources
CREATE TABLE resources (
  id SERIAL PRIMARY KEY,  -- Unique identifier for each resource
  title varchar(255),  -- Title of the resource
  type varchar(50),  -- Type of resource (e.g., legal, educational)
  link TEXT,  -- Link to the resource
  location_based BOOLEAN,  -- Whether the resource is location-specific
  location varchar(255)  -- Location relevant to the resource
);

-- Define the 'professional_vchats' table for professional video chats
CREATE TABLE professional_vchats (
  id SERIAL PRIMARY KEY,
  topic varchar(255),
  creator varchar(100),
  video_url TEXT,
  date DATE,
  time Time,
  is_live BOOLEAN,
  archived BOOLEAN,
  archive_link TEXT
);

-- Define the 'professional_vthreads' table for professional video threads
CREATE TABLE professional_vthreads (
  id SERIAL PRIMARY KEY,
  topic varchar(255),
  creator varchar(100),
  video_url TEXT,
  date DATE,
  time Time,
  is_live BOOLEAN,
  archived BOOLEAN,
  archive_link TEXT
);

-- Define the 'social_media_accounts' table for user's social media accounts
CREATE TABLE social_media_accounts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  social_media_platform varchar(50),
  social_media_id varchar(255),
  profile_url TEXT,
  connected_on timestamp
);

-- Define the 'user_connections' table to represent connections between users
CREATE TABLE user_connections (
  id SERIAL PRIMARY KEY,  -- Unique identifier for each user connection
  user1_id INTEGER REFERENCES users(id),  -- Link to one user in the connection
  user2_id INTEGER REFERENCES users(id),  -- Link to the other user in the connection
  connection_on timestamp  -- Date and time when the connection was established
);

-- Define the 'recommendations' table for user recommendations
CREATE TABLE recommendations (
  id SERIAL PRIMARY KEY,  -- Unique identifier for each recommendation
  user_id INTEGER REFERENCES users(id),  -- Link to the user who made the recommendation
  title varchar(255),  -- Title of the recommendation
  description TEXT,  -- Description of the recommendation
  link TEXT,  -- Link to the recommended resource or product
  recommended_on timestamp  -- Date and time when the recommendation was made
);

-- Define the 'affiliates' table for affiliate partnerships
CREATE TABLE affiliates (
  id SERIAL PRIMARY KEY,  -- Unique identifier for each affiliate entry
  name varchar(255),  -- Name of the affiliate partner
  service_or_product TEXT,  -- Description of the service or product offered
  discount_details TEXT,  -- Details of any discounts or offers
  contact_info TEXT  -- Contact information for the affiliate
);

-- Define the 'mentorship' table for mentoring relationships
CREATE TABLE mentorship (
  id SERIAL PRIMARY KEY,
  mentor_id INTEGER REFERENCES users(id),
  mentee_id INTEGER REFERENCES users(id),
  start_date DATE,
  end_date DATE,
  status varchar(255),
  notes TEXT
);

-- Define the 'reviews' table for user reviews
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,  -- Unique identifier for each review
  user_id INTEGER REFERENCES users(id),  -- Link to the user who wrote the review
  event_id integer,  -- Identifier of the event or service being reviewed
  rating integer,  -- Numerical rating given in the review
  comment TEXT,  -- Text of the review
  created_at timestamp  -- Date and time when the review was posted
);

-- Define the 'reports' table for user reports
CREATE TABLE reports (
  id SERIAL PRIMARY KEY,  -- Unique identifier for each report
  reported_by_user_id INTEGER REFERENCES users(id),  -- User who made the report
  reported_user_id INTEGER REFERENCES users(id),  -- User who is being reported
  content TEXT,  -- Content of the report
  report_date timestamp  -- Date and time when
);

CREATE TABLE emergency_contacts (
  id SERIAL PRIMARY KEY,  -- Unique identifier for each emergency contact entry
  user_id INTEGER REFERENCES users(id),  -- Link to the user associated with the emergency contact
  name varchar(255),  -- Name of the emergency contact
  contact_info TEXT,  -- Contact information (phone number, email, etc.)
  description TEXT,  -- Description of the emergency contact (relation, type of emergency, etc.)
  location varchar(255)  -- Location relevant to the emergency contact
);

CREATE TABLE legal_documents (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  document_type VARCHAR(50),
  content TEXT,
  effective_date DATE
);

-- Corrected 'user_consent_logs' table
CREATE TABLE user_consent_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  document_id INTEGER REFERENCES legal_documents(id),
  consent_date TIMESTAMP,
  version INT
);

-- Corrected 'error_logs' table
CREATE TABLE error_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    log_type VARCHAR(50),
    error_message TEXT,
    error_details JSON,
    log_date TIMESTAMP
);