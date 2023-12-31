\c bluelagoon_dev;


-- Users seed data (1 admin and 6 generic users)
\c bluelagoon_dev;

TRUNCATE TABLE users, registrations, security, profiles, vchats, vthreads, chat_messages, notifications, groups, user_groups, events, resources, professional_vchats, professional_vthreads, social_media_accounts, connections, recommendations, affiliates, mentorships, reviews, reports, emergency_contacts, legal_documents, consent_logs, error_logs RESTART IDENTITY CASCADE;


INSERT INTO users (user_id, username, email, password_hash, date_of_birth, is_age_verified, account_status, phone_number, profile_pic, interests, challenges, experiences, locations, join_date, role, last_login, reset_token) VALUES
(1, 'alphaOmega', 'djonesgrace@gmail.com', 'hashed_PlatinumBella13*', '1975-03-14', true, 'active', '1234567890', 'profile_pic_url', 'Father of 2, Male', 'Single parenting', 'Experienced father', 'Brooklyn resident', '2021-01-01', 'admin', '2023-01-01 09:00:00',' NULL'),
(2, 'user1@example.com', 'user1@example.com', 'hashed_password1', '1990-01-01', true, 'active', '1234567891', 'profile_pic_url', 'Interests1', 'Challenges1', 'Experiences1', 'Location1', '2021-01-01', 'user', '2023-01-01 09:00:00', NULL),
(3, 'user2@example.com', 'user2@example.com', 'hashed_password2', '1990-02-01', true, 'active', '1234567892', 'profile_pic_url', 'Interests2', 'Challenges2', 'Experiences2', 'Location2', '2021-02-02', 'user', '2023-01-02 09:00:00', NULL),
(4, 'user3@example.com', 'user3@example.com', 'hashed_password3', '1990-03-01', true, 'active', '1234567893', 'profile_pic_url', 'Interests3', 'Challenges3', 'Experiences3', 'Location3', '2021-03-03', 'user', '2023-01-03 09:00:00', NULL),
(5, 'user4@example.com', 'user4@example.com', 'hashed_password4', '1990-04-01', true, 'active', '1234567894', 'profile_pic_url', 'Interests4', 'Challenges4', 'Experiences4', 'Location4', '2021-04-04', 'user', '2023-01-04 09:00:00', NULL),
(6, 'user5@example.com', 'user5@example.com', 'hashed_password5', '1990-05-01', true, 'active', '1234567895', 'profile_pic_url', 'Interests5', 'Challenges5', 'Experiences5', 'Location5', '2021-05-05', 'user', '2023-01-05 09:00:00', NULL),
(7, 'user6@example.com', 'user6@example.com', 'hashed_password6', '1990-06-01', true, 'active', '1234567896', 'profile_pic_url', 'Interests6', 'Challenges6', 'Experiences6', 'Location6', '2021-06-06', 'user', '2023-01-06 09:00:00', NULL);

INSERT INTO registrations (user_id, email, registration_started, initial_data, registration_token, token_expiration, additional_info, verification_process, agree_to_terms_of_service) VALUES
(1, 'alphaOmega@example.com', NOW(), '{}', '123e4567-e89b-12d3-a456-426614174000', NOW() + INTERVAL '1 day', 'Admin Info', 'process1', true),
(2, 'betaBravo@example.com', NOW(), '{}', 'c0e8347c-c8c3-49f1-950c-49842fffb990', NOW() + INTERVAL '1 day', 'User Info', 'process2', true),
(3, 'charlieDelta@example.com', NOW(), '{}', 'fd370fe2-f806-4944-ae94-bbbe0c291fa9', NOW() + INTERVAL '1 day', 'User Info', 'process3', true),
(4, 'deltaEcho@example.com', NOW(), '{}', '5b7bad98-f2ee-4e97-a2b9-1f52afe25ef9', NOW() + INTERVAL '1 day', 'User Info', 'process4', true),
(5, 'echoFoxtrot@example.com', NOW(), '{}', '82964f04-465a-4cc7-b69c-9d517ea02c7e', NOW() + INTERVAL '1 day', 'User Info', 'process5', true),
(6, 'foxtrotGolf@example.com', NOW(), '{}', '5b23201c-bc19-4446-a38d-f01347025163', NOW() + INTERVAL '1 day', 'User Info', 'process6', true),
(7, 'golfHotel@example.com', NOW(), '{}', 'f42f5273-aa62-4cc1-946a-a416fdded2c8', NOW() + INTERVAL '1 day', 'User Info', 'process7', true);


INSERT INTO security (user_id, email_verified, phone_verified, phone_verification_code, two_factor_enabled, last_login) VALUES
(1, true, true, '123456', false, '2023-01-01 09:00:00'),
(2, false, true, '234567', true, '2023-02-02 10:00:00'),
(3, true, false, '345678', false, '2023-03-03 11:00:00'),
(4, false, false, '456789', true, '2023-04-04 12:00:00'),
(5, true, true, '567890', false, '2023-05-05 13:00:00'),
(6, false, true, '678901', true, '2023-06-06 14:00:00'),
(7, true, false, '789012', false, '2023-07-07 15:00:00');

INSERT INTO profiles (user_id, firstname, lastname, gender, profile_picture_url, bio, location) VALUES
(1, 'Dee', 'Jones', 'Male', 'https://example.com/profile1.jpg', 'Bio for Alpha', 'Location1'),
(2, 'Beta', 'Bravo', 'Female', 'https://example.com/profile2.jpg', 'Bio for Beta', 'Location2'),
(3, 'Charlie', 'Delta', 'Male', 'https://example.com/profile3.jpg', 'Bio for Charlie', 'Location3'),
(4, 'Delta', 'Echo', 'Female', 'https://example.com/profile4.jpg', 'Bio for Delta', 'Location4'),
(5, 'Echo', 'Foxtrot', 'Male', 'https://example.com/profile5.jpg', 'Bio for Echo', 'Location5'),
(6, 'Foxtrot', 'Golf', 'Female', 'https://example.com/profile6.jpg', 'Bio for Foxtrot', 'Location6'),
(7, 'Golf', 'Hotel', 'Male', 'https://example.com/profile7.jpg', 'Bio for Golf', 'Location7');

INSERT INTO vchats (opentok_session_id, session_name, created_at, updated_at, status, duration, session_type, host_id, recording_status) VALUES
('1_MX40NzgzMzA5MX5-MTcwMzc4NzI4MzQ0Nn4', 'Chat Session 1', NOW(), NOW(), 'active', 30, 'group', 'host1', 'started'),
('2_MX40NzgzMzA5MX5-MTcwMzc4NzI4MzUxM3', 'Chat Session 2', NOW(), NOW(), 'active', 45, 'group', 'host2', 'started'),
('3_MX40NzgzMzA5MX5-MTcwMzc4NzI4MzU2Nn4', 'Chat Session 3', NOW(), NOW(), 'active', 60, 'group', 'host3', 'started'),
('4_MX40NzgzMzA5MX5-MTcwMzc4NzI4MzYyNH4', 'Chat Session 4', NOW(), NOW(), 'active', 30, 'group', 'host4', 'started'),
('5_MX40NzgzMzA5MX5-MTcwMzc4NzI4MzY4N3', 'Chat Session 5', NOW(), NOW(), 'active', 45, 'group', 'host5', 'started');

INSERT INTO participants (video_session_id, participant_id, participant_name, join_time, leave_time, role, audio_status, video_status) VALUES
(1, 'participant1', 'John Doe', NOW(), NULL, 'member', 'on', 'on'),
(1, 'participant2', 'Jane Doe', NOW(), NULL, 'member', 'off', 'on'),
(2, 'participant3', 'Alice Smith', NOW(), NULL, 'member', 'on', 'off'),
(2, 'participant4', 'Bob Johnson', NOW(), NULL, 'member', 'on', 'on'),
(3, 'participant5', 'Emma Brown', NOW(), NULL, 'member', 'on', 'on');

INSERT INTO vthreads (host_user_id, title, description, video_url, scheduled_time, duration) VALUES
(1, 'Parenting Tips', 'Discussion on modern parenting', 'https://example.com/vthread1', NOW(), 30),
(2, 'Healthy Eating', 'Nutrition and children', 'https://example.com/vthread2', NOW(), 45),
(3, 'Education in 2023', 'Future of schooling', 'https://example.com/vthread3', NOW(), 60),
(4, 'Work-Life Balance', 'Managing work and family', 'https://example.com/vthread4', NOW(), 75),
(5, 'Fatherhood Challenges', 'Overcoming daily challenges', 'https://example.com/vthread5', NOW(), 90),
(6, 'Kids and Technology', 'Handling tech in parenting', 'https://example.com/vthread6', NOW(), 105),
(7, 'Outdoor Activities', 'Engaging kids outdoors', 'https://example.com/vthread7', NOW(), 120);

INSERT INTO chat_messages (thread_id, user_id, message, timestamp) VALUES
(1, 1, 'Hello everyone, welcome to the chat!', '2023-01-01 09:05:00'),
(2, 2, 'Thanks for hosting this session.', '2023-01-01 09:06:00'),
(3, 3, 'Can''t wait to start discussing today''s topic.', '2023-01-02 10:10:00'),
(4, 4, 'I have some questions about the topic.', '2023-01-02 10:15:00'),
(5, 5, 'Great presentation so far!', '2023-01-03 11:20:00'),
(6, 6, 'Agreed, very informative.', '2023-01-03 11:25:00'),
(7, 7, 'Looking forward to the next one!', '2023-01-04 12:30:00');

INSERT INTO notifications (user_id, type, message, date) VALUES
(1, 'Reminder', 'Upcoming Event Reminder', '2021-01-01 09:00:00'),
(2, 'Alert', 'New Message Received', '2021-02-01 10:00:00'),
(3, 'Update', 'Profile Updated Successfully', '2021-03-01 11:00:00'),
(4, 'News', 'New Feature Announcement', '2021-04-01 12:00:00'),
(5, 'Reminder', 'Schedule Your Next VChat', '2021-05-01 13:00:00'),
(6, 'Alert', 'New Connection Request', '2021-06-01 14:00:00'),
(7, 'Update', 'System Maintenance Notification', '2021-07-01 15:00:00');

INSERT INTO groups (group_name, description, creation_date) VALUES
('Single Fathers Group', 'A group for single fathers', '2021-01-01'),
('Budgeting Tips', 'Financial advice for parents', '2021-02-01'),
('Healthy Cooking', 'Recipes and cooking tips', '2021-03-01'),
('DIY Crafts', 'Crafting activities for kids', '2021-04-01'),
('Parenting 101', 'Basic parenting tips and tricks', '2021-05-01'),
('Fitness Enthusiasts', 'Keeping fit as a parent', '2021-06-01'),
('Tech-Savvy Parents', 'Integrating technology in parenting', '2021-07-01');

-- User Groups
INSERT INTO user_groups (user_id, group_id, join_date) VALUES
(1, 1, '2021-01-01'),
(2, 2, '2021-02-01'),
(3, 3, '2021-03-01'),
(4, 4, '2021-04-01'),
(5, 5, '2021-05-01'),
(6, 6, '2021-06-01'),
(7, 7, '2021-07-01');

INSERT INTO events (title, description, location, date, time, capacity, organizer, category, contact_email, sign_up_link) VALUES
('Parenting Workshop', 'Join us for a parenting workshop covering various topics.', 'New York', '2023-01-20', '14:00', 50, 'Parenting Association', 'Workshop', 'info@parentingassociation.com', 'archive1.url'),
('Family Fun Day', 'A day of fun activities for families at the park.', 'Los Angeles', '2023-02-15', '10:00', 100, 'Community Center', 'Play day', 'info@communitycenter.org', 'archive2.url'),
('Kids Educational Fair', 'An educational fair for kids with interactive exhibits.', 'Chicago', '2023-03-10', '11:30', 80, 'Education Expo', 'Educational Fair', 'info@educationexpo.com', 'archive3.url'),
('Parenting Seminar', 'Learn effective parenting strategies from experts.', 'Miami', '2023-04-05', '15:30', 60, 'Parenting Solutions', 'Seminar', 'info@parentingsolutions.org', 'archive4.url'),
('Outdoor Adventure Day', 'Explore the great outdoors with your family.', 'Seattle', '2023-05-12', '09:00', 70, 'Adventure Club', 'Play day', 'info@adventureclub.com', 'archive5.url'),
('Cooking Class for Kids', 'A cooking class for children to learn new recipes.', 'Denver', '2023-06-18', '13:00', 40, 'Chefs Kitchen', 'Workshop', 'info@chefskitchen.com', 'archive6.url'),
('Family Fitness Challenge', 'Get active as a family with our fitness challenge.', 'Brooklyn', '2023-07-25', '16:30', 90, 'Fitness Hub', 'Play day', 'info@fitnesshub.com', 'archive7.url');

INSERT INTO resources (title, type, link, location_based, location) VALUES
('Legal Aid for Single Fathers', 'Legal', 'https://legalaid.com', TRUE, 'New York'),
('Financial Planning for Parents', 'Financial', 'https://finance4parents.com', FALSE, ''),
('Childcare Services in Brooklyn', 'Childcare', 'https://childcarebrooklyn.com', TRUE, 'Brooklyn'),
('Online Educational Resources', 'Education', 'https://eduonline.com', FALSE, ''),
('Health and Wellness Tips', 'Health', 'https://healthyparents.com', FALSE, ''),
('Parenting Podcasts', 'Entertainment', 'https://parentpodcasts.com', FALSE, ''),
('Community Support Groups', 'Community', 'https://supportgroups.com', TRUE, 'Los Angeles');

INSERT INTO professional_vchats (topic, creator, industry, credentials, date, time, video_url, is_live, archived, archive_link) VALUES
('Effective Parenting', 'Dr. Smith', 'Psychology', 'PhD in Clinical Psychology', '2021-01-01', '19:00', 'https://example.com/webdevchat1', FALSE, TRUE, 'https://example.com/archive1'),
('Financial Management', 'John Doe', 'Finance', 'Certified Financial Planner', '2021-02-01', '20:00', 'https://example.com/datasciencechat1', FALSE, TRUE, 'https://example.com/archive2'),
('Child Education', 'Jane Doe', 'Education', 'Masters in Education', '2021-03-01', '18:00', 'https://example.com/aichat1', TRUE, FALSE, 'https://example.com/archive3'),
('Health and Fitness', 'Dr. Green', 'Health', 'MD in General Medicine', '2021-04-01', '17:00', 'https://example.com/productchat1', TRUE, FALSE, 'https://example.com/archive4'),
('Cooking Healthy Meals', 'Chef Ryan', 'Culinary Arts', 'Executive Chef', '2021-05-01', '16:00', 'https://example.com/cloudchat1', FALSE, TRUE, 'https://example.com/archive5'),
('Mental Health Awareness', 'Dr. Brown', 'Psychiatry', 'Psychiatrist with 10 years experience', '2021-06-01', '15:00', 'https://example.com/securitychat1', FALSE, TRUE, 'https://example.com/archive6'),
('Technology for Kids', 'Tech Guru', 'Technology', 'Senior Software Engineer', '2021-07-01', '14:00', 'https://example.com/cloudchat1', TRUE, FALSE, 'https://example.com/archive7');

INSERT INTO professional_vthreads (topic, creator, industry, credentials, date, time, discussion_url, is_active, archived, archive_link) VALUES
('Effective Parenting Discussions', 'Dr. Smith', 'Psychology', 'PhD in Clinical Psychology', '2023-01-01', '19:00', 'https://example.com/parenting', TRUE, FALSE, 'https://example.com/archive1'),
('Financial Management Q&A', 'John Doe', 'Finance', 'Certified Financial Planner', '2023-02-01', '20:00', 'https://example.com/finance', TRUE, FALSE, 'https://example.com/archive2'),
('Education Innovations Chat', 'Jane Doe', 'Education', 'Masters in Education', '2023-03-01', '18:00', 'https://example.com/education', TRUE, FALSE, 'https://example.com/archive3'),
('Health and Wellness Forum', 'Dr. Green', 'Health', 'MD in General Medicine', '2023-04-01', '17:00', 'https://example.com/health', TRUE, FALSE, 'https://example.com/archive4'),
('Culinary Arts Corner', 'Chef Ryan', 'Culinary Arts', 'Executive Chef', '2023-05-01', '16:00', 'https://example.com/culinary', TRUE, FALSE, 'https://example.com/archive5'),
('Mental Health Support Group', 'Dr. Brown', 'Psychiatry', 'Psychiatrist with 10 years experience', '2023-06-01', '15:00', 'https://example.com/mentalhealth', TRUE, FALSE, 'https://example.com/archive6'),
('Tech for Kids Workshop', 'Tech Guru', 'Technology', 'Senior Software Engineer', '2023-07-01', '14:00', 'https://example.com/techforkids', TRUE, FALSE, 'https://example.com/archive7');

INSERT INTO social_media_accounts (user_id, social_media_platform, social_media_id, profile_url, connected_on) VALUES
(1, 'Facebook', 'fb_id_1', 'https://facebook.com/user1', '2021-01-01 10:00:00'),
(2, 'Twitter', 'tw_id_2', 'https://twitter.com/user2', '2021-02-02 11:00:00'),
(3, 'Instagram', 'ig_id_3', 'https://instagram.com/user3', '2021-03-03 12:00:00'),
(4, 'LinkedIn', 'li_id_4', 'https://linkedin.com/user4', '2021-04-04 13:00:00'),
(5, 'Pinterest', 'pin_id_5', 'https://pinterest.com/user5', '2021-05-05 14:00:00'),
(6, 'YouTube', 'yt_id_6', 'https://youtube.com/user6', '2021-06-06 15:00:00'),
(7, 'TikTok', 'tik_id_7', 'https://tiktok.com/user7', '2021-07-07 16:00:00');

INSERT INTO connections (user1_id, user2_id, connection_on) VALUES
(1, 2, '2023-01-01 12:00:00'),
(2, 3, '2023-02-02 13:00:00'),
(3, 4, '2023-03-03 14:00:00'),
(4, 5, '2023-04-04 15:00:00'),
(5, 6, '2023-05-05 16:00:00'),
(6, 7, '2023-06-06 17:00:00'),
(7, 1, '2023-07-07 18:00:00');

INSERT INTO recommendations (user_id, title, description, link, recommended_on) VALUES
(1, 'Great Parenting Book', 'A book on modern parenting techniques', 'https://parentingbook.com', '2021-01-01'),
(2, 'Educational Apps for Kids', 'Apps to help with child education', 'https://eduapps.com', '2021-02-02'),
(3, 'Local Childcare Services', 'Recommended childcare services in the area', 'https://childcare.com', '2021-03-03'),
(4, 'Financial Planning for Parents', 'Resources for managing family finances', 'https://financeparents.com', '2021-04-04'),
(5, 'Healthy Recipes for Kids', 'Nutritious and delicious recipes', 'https://healthyrecipes.com', '2021-05-05'),
(6, 'Outdoor Activities for Families', 'Great outdoor activities for parents and children', 'https://outdoorfun.com', '2021-06-06'),
(7, 'Parenting Support Groups', 'Local support groups for single parents', 'https://supportgroups.com', '2021-07-07');

INSERT INTO affiliates (name, service_or_product, discount_details, contact_info) VALUES
('Affiliate 8', 'Product', 'Exclusive offer for members', 'Contact: affiliate8@example.com'),
('Affiliate 9', 'Service', '10% discount for members', 'Contact: affiliate9@example.com'),
('Affiliate 10', 'Product', 'Special discount for members', 'Contact: affiliate10@example.com'),
('Affiliate 11', 'Service', '15% off for members', 'Contact: affiliate11@example.com'),
('Affiliate 12', 'Product', 'Limited-time offer for members', 'Contact: affiliate12@example.com'),
('Affiliate 13', 'Service', 'Free trial for members', 'Contact: affiliate13@example.com'),
('Affiliate 14', 'Product', 'Exclusive deal for members', 'Contact: affiliate14@example.com');

INSERT INTO mentorships (mentor_id, mentee_id, start_date, end_date, status, notes) VALUES
(1, 2, '2023-01-15', '2023-04-15', 'Active', 'New father'),
(3, 4, '2023-02-10', '2023-05-10', 'Inactive', 'Father of 3'),
(5, 6, '2023-03-20', '2023-06-20', 'Inactive', 'Father of 1'),
(2, 1, '2023-04-01', '2023-07-01', 'Active', 'Lost a child'),
(4, 3, '2023-05-05', '2023-08-05', 'Active', 'Court supervised'),
(6, 5, '2023-06-15', '2023-09-15', 'Active', 'Custody petition'),
(7, 1, '2023-07-10', '2023-10-10', 'Active', 'Lost of spouse');

INSERT INTO reviews (user_id, event_id, rating, comment, created_at) VALUES
(1, 1, 5, 'Great event! I learned a lot.', '2023-01-15 09:30:00'),
(2, 1, 4, 'Informative and well-organized.', '2023-01-16 11:45:00'),
(3, 2, 5, 'Excellent mentorship program.', '2023-02-10 15:20:00'),
(4, 2, 4, 'Helped me grow in my field.', '2023-02-11 10:15:00'),
(5, 3, 5, 'Amazing experience!', '2023-03-20 14:00:00'),
(6, 3, 4, 'Valuable insights and guidance.', '2023-03-21 13:30:00'),
(7, 4, 3, 'The event was okay, could be improved.', '2023-04-15 08:00:00');

-- Reports
INSERT INTO reports (reported_by_user_id, reported_user_id, content, report_date) VALUES
(1, 2, 'Inappropriate Content - This event had inappropriate content.', '2023-01-15 12:30:00'),
(2, 3, 'Technical Issues - Encountered technical problems during the event.', '2023-02-10 14:45:00'),
(3, 4, 'Misconduct - One of the participants exhibited misconduct.', '2023-03-20 16:10:00'),
(4, 5, 'Late Start - The event started much later than scheduled.', '2023-04-05 09:15:00'),
(5, 6, 'No-show Speaker - The event speaker did not show up.', '2023-05-12 17:30:00'),
(6, 7, 'Harassment - I experienced harassment during the mentorship program.', '2023-06-25 11:20:00'),
(7, 1, 'Late Start - The event started late as usual.', '2023-07-02 10:30:00');

INSERT INTO emergency_contacts (user_id, name, contact_info, description, location) VALUES
(1, 'NYC Emergency Services', '911', 'Immediate emergency assistance', 'New York'),
(2, 'LA Health Services', '911', 'Health-related emergencies', 'Los Angeles'),
(3, 'Chicago Fire Department', '911', 'Fire-related emergencies', 'Chicago'),
(4, 'Miami Police Department', '911', 'Law enforcement assistance', 'Miami'),
(5, 'Seattle Childcare Services', '800-123-4567', 'Childcare emergencies and support', 'Seattle'),
(6, 'Denver Mental Health Hotline', '800-456-7890', 'Mental health crisis line', 'Denver'),
(7, 'Brooklyn Community Support', '800-789-1234', 'Community and social support services', 'Brooklyn');

INSERT INTO legal_documents (title, document_type, content, effective_date) VALUES
('Terms of Service', 'Terms', 'Content of Terms of Service', '2023-01-01'),
('Privacy Policy', 'Privacy', 'Content of Privacy Policy', '2023-01-02'),
('User Agreement', 'Agreement', 'Content of User Agreement', '2023-01-03'),
('Cookie Policy', 'Policy', 'Content of Cookie Policy', '2023-01-04'),
('Code of Conduct', 'Policy', 'Content of Code of Conduct', '2023-01-05'),
('Data Usage Policy', 'Policy', 'Content of Data Usage Policy', '2023-01-06'),
('Refund Policy', 'Policy', 'Content of Refund Policy', '2023-01-07');

INSERT INTO consent_logs (user_id, document_id, consent_date, version) VALUES
(1, 1, '2023-01-08', 1),
(2, 2, '2023-01-09', 1),
(3, 3, '2023-01-10', 1),
(4, 4, '2023-01-11', 1),
(5, 5, '2023-01-12', 1),
(6, 6, '2023-01-13', 1),
(7, 7, '2023-01-14', 1);

INSERT INTO error_logs (user_id, log_type, error_message, error_details, log_date) VALUES
(1, 'Application Error', 'An unexpected error occurred.', '{}', '2023-01-15 10:30:00'),
(2, 'Database Error', 'Failed to insert data into the events table.', '{}', '2023-01-16 11:45:00'),
(3, 'Server Error', 'The server encountered an issue.', '{}', '2023-01-17 12:20:00'),
(4, 'Security Alert', 'Unauthorized access attempt detected.', '{}', '2023-01-18 13:15:00'),
(5, 'Performance Issue', 'Application performance degraded.', '{}', '2023-01-19 14:30:00'),
(6, 'Authentication Error', 'Failed login attempt.', '{}', '2023-01-20 15:45:00'),
(7, 'Payment Gateway Error', 'Payment processing error.', '{}', '2023-01-21 16:20:00');
