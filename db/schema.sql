-- Drop the existing database if it exists to start fresh
DROP DATABASE IF EXISTS blueLagoon_dev;

-- Create a new database for the application
CREATE DATABASE blueLagoon_dev;

-- Connect to the newly created database
\c blueLagoon_dev;

-- Define the 'users_registration' table with registration-related information
CREATE TABLE user_registrations (
  id SERIAL PRIMARY KEY,  -- Unique identifier for each registration
  user_id INTEGER REFERENCES users(id),  -- Link to the user
  RegistrationDate DATE,  -- Date when the registration occurred
  AdditionalInfo TEXT  -- Any additional information
);

-- Define the 'users' table with user-related information
Table users {
  id integer [primary key]  -- Unique identifier for each user
  role varchar(50)  -- Role of the user (e.g., 'admin', 'user')
  Email varchar(255)  -- User's email address
  Password varchar(255)  -- Hashed password for user authentication
  ProfilePic TEXT  -- URL or path to the user's profile picture
  Interests TEXT  -- User's interests
  Challenges TEXT  -- Challenges faced by the user
  Experiences TEXT  -- User's experiences or bio
  Locations varchar(100)  -- User's location
  JoinDate DATE  -- Date when the user joined the application
}


-- Define the 'vchat' table for video chat sessions
Table vchat {
  id SERIAL [primary key]  -- Unique identifier for each video chat session
  user_id integer [ref: > users.id]  -- Link to the user who initiated the chat
  VideoURL TEXT  -- URL to the video file of the chat
  ScheduleTime timestamp  -- Scheduled time for the chat
  Duration integer  -- Duration of the chat in minutes
  ArchiveLink TEXT  -- Link to the archived chat
  StartTime timestamp  -- Actual start time of the chat
  EndTime timestamp  -- Actual end time of the chat
  ArchiveURL TEXT  -- URL for the archived video chat
}

-- Define the 'vthreads' table for video threads
Table vthreads {
  id integer [primary key]  -- Unique identifier for each video thread
  user_id integer [ref: > users.id]  -- Link to the user who created the thread
  VideoURL TEXT  -- URL to the video in the thread
  Title varchar(255)  -- Title of the video thread
  Category varchar(100)  -- Category of the video thread
  CreationDate DATE  -- Date the thread was created
}

-- Define the 'notifications' table for user notifications
Table notifications {
  id SERIAL [primary key]  -- Unique identifier for each notification
  user_id integer [ref: > users.id]  -- Link to the user receiving the notification
  Type varchar(50)  -- Type of notification (e.g., alert, message)
  Message TEXT  -- Notification message content
  Date timestamp  -- Date and time the notification was sent
}

-- Define the 'groups' table for user groups
Table groups {
  id SERIAL [primary key]  -- Unique identifier for each group
  GroupName varchar(100)  -- Name of the group
  Description TEXT  -- Description of the group
  CreationDate DATE  -- Date the group was created
}

-- Define the 'user_groups' table to link users with groups
Table user_groups {
  id SERIAL [primary key]  -- Unique identifier for each user-group association
  user_id integer [ref: > users.id]  -- Link to the user
  group_id integer [ref: > groups.id]  -- Link to the group
  JoinDate DATE  -- Date the user joined the group
}

-- Define the 'events' table for events in the application
Table events {
  id SERIAL [primary key]  -- Unique identifier for each event
  Title varchar(255)  -- Title of the event
  Description TEXT  -- Description of the event
  Location varchar(100)  -- Location where the event takes place
  Category varchar(100)  -- Category of the event
  SignUpLink TEXT  -- Link for users to sign up for the event
  Date DATE  -- Date of the event
  Time Time  -- Time of the event
}

-- Define the 'resources' table for various resources
Table resources {
  id SERIAL [primary key]  -- Unique identifier for each resource
  Title varchar(255)  -- Title of the resource
  Type varchar(50)  -- Type of resource (e.g., legal, educational)
  Link TEXT  -- Link to the resource
  LocationBased BOOLEAN  -- Whether the resource is location-specific
  Location varchar(255)  -- Location relevant to the resource
}

-- Define the 'professional_vchats' table for professional video chats
Table professional_vchats {
  id SERIAL [primary key]  -- Unique identifier for each professional video chat
  Topic varchar(255)  -- Topic of the video chat
  Speaker varchar(100)  -- Speaker or host of the video chat
  VideoURL TEXT  -- URL to the video of the chat
  Date DATE  -- Date of the chat
  Time Time  -- Time of the chat
  ArchiveLink TEXT  -- Link to the archived chat
  isLive BOOLEAN  -- Indicates if the chat is live
  Archived BOOLEAN  -- Indicates if the chat is archived
}

-- Define the 'professional_vthreads' table for professional video threads
Table professional_vthreads {
  id SERIAL [primary key]  -- Unique identifier for each professional video thread
  Topic varchar(255)  -- Topic of the video thread
  Creator varchar(100)  -- Creator or host of the video thread
  VideoURL TEXT  -- URL to the video of the thread
  Date DATE  -- Date of the thread
  Time Time  -- Time of the thread
  Archived BOOLEAN  -- Indicates if the thread is archived
}

-- Define the 'social_media_accounts' table for user's social media accounts
Table social_media_accounts {
  id SERIAL [primary key]  -- Unique identifier for each social media account entry
  user_id integer [ref: > users.id]  -- Link to the user
  SocialMediaPlatform varchar(50)  -- Name of the social media platform
  SocialMediaID varchar(255)  -- User's ID on the social media platform
  ProfileURL TEXT  -- URL to the user's social media profile
  ConnectedOn timestamp  -- Date and time when the account was connected
}

-- Define the 'user_connections' table to represent connections between users
Table user_connections {
  id SERIAL [primary key]  -- Unique identifier for each user connection
  user1_id integer [ref: > users.id]  -- Link to one user in the connection
  user2_id integer [ref: > users.id]  -- Link to the other user in the connection
  ConnectionOn timestamp  -- Date and time when the connection was established
}

-- Define the 'recommendations' table for user recommendations
Table recommendations {
  id SERIAL [primary key]  -- Unique identifier for each recommendation
  user_id integer [ref: > users.id]  -- Link to the user who made the recommendation
  Title varchar(255)  -- Title of the recommendation
  Description TEXT  -- Description of the recommendation
  Link TEXT  -- Link to the recommended resource or product
  recommendedOn timestamp  -- Date and time when the recommendation was made
}

-- Define the 'affiliates' table for affiliate partnerships
Table affiliates {
  id SERIAL [primary key]  -- Unique identifier for each affiliate entry
  Name varchar(255)  -- Name of the affiliate partner
  ServiceOrProduct TEXT  -- Description of the service or product offered
  DiscountDetails TEXT  -- Details of any discounts or offers
  ContactInfo TEXT  -- Contact information for the affiliate
}

-- Define the 'mentorship' table for mentoring relationships
Table mentorship {
  id SERIAL [primary key]  -- Unique identifier for each mentorship
  mentor_id integer [ref: > users.id]  -- Link to the mentor user
  mentee_id integer [ref: > users.id]  -- Link to the mentee user
  StartDate DATE  -- Date when the mentorship started
  Notes TEXT  -- Additional notes or details about the mentorship
}

-- Define the 'reviews' table for user reviews
Table reviews {
  id SERIAL [primary key]  -- Unique identifier for each review
  user_id integer [ref: > users.id]  -- Link to the user who wrote the review
  EventOrServiceId integer  -- Identifier of the event or service being reviewed
  Rating integer  -- Numerical rating given in the review
  Comment TEXT  -- Text of the review
  ReviewDate timestamp  -- Date and time when the review was posted
}

-- Define the 'reports' table for user reports
Table reports {
  id SERIAL [primary key]  -- Unique identifier for each report
  reported_by_user_id integer [ref: > users.id]  -- User who made the report
  reported_user_id integer [ref: > users.id]  -- User who is being reported
  Content TEXT  -- Content of the report
  ReportDate timestamp  -- Date and time when
}

Table emergency_contacts {
  id SERIAL [primary key]  -- Unique identifier for each emergency contact entry
  user_id integer [ref: > users.id]  -- Link to the user associated with the emergency contact
  Name varchar(255)  -- Name of the emergency contact
  ContactInfo TEXT  -- Contact information (phone number, email, etc.)
  Description TEXT  -- Description of the emergency contact (relation, type of emergency, etc.)
  Location varchar(255)  -- Location relevant to the emergency contact
}

CREATE TABLE legal_documents (
    id SERIAL PRIMARY KEY,  -- Unique identifier for each legal document
    title VARCHAR(255),  -- Title of the legal document (e.g., 'Privacy Policy')
    content TEXT,  -- Full text content of the document
    version INT,  -- Version number of the document
    effective_date DATE  -- Date when the document becomes effective
);

CREATE TABLE user_consent_logs (
    id SERIAL PRIMARY KEY,  -- Unique identifier for each user consent log entry
    user_id INT REFERENCES users(id),  -- Link to the user who gave consent
    document_id INT REFERENCES legal_documents(id),  -- Link to the legal document for which consent was given
    consent_date TIMESTAMP,  -- Date and time when the consent was recorded
    version INT  -- Version of the legal document at the time of consent
);

CREATE TABLE error_logs (
    id SERIAL PRIMARY KEY,  -- Unique identifier for each error log entry
    user_id INT REFERENCES users(id),  -- Link to the user who experienced the error (nullable if the error is not user-specific)
    error_type VARCHAR(50),  -- Type of error (e.g., 'Database Error', 'Application Error')
    error_message TEXT,  -- Detailed error message
    error_time TIMESTAMP,  -- Date and time when the error occurred
    additional_info JSON  -- JSON field for storing additional data related to the error, like request headers or system info
);



