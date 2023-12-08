\c blueLagoon_dev;
-- Users seed data (1 admin and 6 generic users)
INSERT INTO users (Email, Password, ProfilePic, Interests, Challenges, Experiences, Locations, JoinDate, role) VALUES
('jonesda314@outlook.com', 'hashed_PlatinumBella13*', '', 'Father of 2, Male', 'Single parenting', 'Experienced father, Brooklyn resident', 'Brooklyn, NY', '1975-03-14', 'admin'),
('user1@example.com', 'hashed_password1', '', 'Interests1', 'Challenges1', 'Experiences1', 'Location1', '2021-01-01', 'user'),
('user2@example.com', 'hashed_password2', '', 'Interests2', 'Challenges2', 'Experiences2', 'Location2', '2021-02-02', 'user'),
('user3@example.com', 'hashed_password3', '', 'Interests3', 'Challenges3', 'Experiences3', 'Location3', '2021-03-03', 'user'),
('user4@example.com', 'hashed_password4', '', 'Interests4', 'Challenges4', 'Experiences4', 'Location4', '2021-04-04', 'user'),
('user5@example.com', 'hashed_password5', '', 'Interests5', 'Challenges5', 'Experiences5', 'Location5', '2021-05-05', 'user'),
('user6@example.com', 'hashed_password6', '', 'Interests6', 'Challenges6', 'Experiences6', 'Location6', '2021-06-06', 'user');

INSERT INTO vchat (user_id, ScheduleTime, Duration, ArchiveLink, StartTime, EndTime, ArchiveURL) VALUES
(1, '2023-01-01 09:00:00', 30, 'archive1.link', '2023-01-01 09:00:00', '2023-01-01 09:30:00', 'archive1.url'),
(2, '2023-01-02 10:00:00', 45, 'archive2.link', '2023-01-02 10:00:00', '2023-01-02 10:45:00', 'archive2.url'),
(3, '2023-01-03 11:00:00', 60, 'archive3.link', '2023-01-03 11:00:00', '2023-01-03 12:00:00', 'archive3.url'),
(4, '2023-01-04 12:00:00', 30, 'archive4.link', '2023-01-04 12:00:00', '2023-01-04 12:30:00', 'archive4.url'),
(5, '2023-01-05 13:00:00', 45, 'archive5.link', '2023-01-05 13:00:00', '2023-01-05 13:45:00', 'archive5.url'),
(6, '2023-01-06 14:00:00', 60, 'archive6.link', '2023-01-06 14:00:00', '2023-01-06 15:00:00', 'archive6.url'),
(1, '2023-01-07 15:00:00', 30, 'archive7.link', '2023-01-07 15:00:00', '2023-01-07 15:30:00', 'archive7.url');

INSERT INTO vthreads (user_id, Title, Category, CreationDate) VALUES
(1, 'Parenting Tips', 'Advice', '2021-01-01'),
(2, 'Cooking for Kids', 'Lifestyle', '2021-02-01'),
(3, 'DIY Projects', 'Hobbies', '2021-03-01'),
(4, 'Educational Activities', 'Education', '2021-04-01'),
(5, 'Outdoor Adventures', 'Recreation', '2021-05-01'),
(6, 'Storytime Sessions', 'Entertainment', '2021-06-01'),
(1, 'Fitness and Health', 'Wellness', '2021-07-01');

INSERT INTO notifications (user_id, Type, Message, Date) VALUES
(1, 'Reminder', 'Upcoming Event Reminder', '2021-01-01 09:00:00'),
(2, 'Alert', 'New Message Received', '2021-02-01 10:00:00'),
(3, 'Update', 'Profile Updated Successfully', '2021-03-01 11:00:00'),
(4, 'News', 'New Feature Announcement', '2021-04-01 12:00:00'),
(5, 'Reminder', 'Schedule Your Next VChat', '2021-05-01 13:00:00'),
(6, 'Alert', 'New Connection Request', '2021-06-01 14:00:00'),
(1, 'Update', 'System Maintenance Notification', '2021-07-01 15:00:00');

INSERT INTO groups (GroupName, Description, CreationDate) VALUES
('Single Fathers Group', 'A group for single fathers', '2021-01-01'),
('Budgeting Tips', 'Financial advice for parents', '2021-02-01'),
('Healthy Cooking', 'Recipes and cooking tips', '2021-03-01'),
('DIY Crafts', 'Crafting activities for kids', '2021-04-01'),
('Parenting 101', 'Basic parenting tips and tricks', '2021-05-01'),
('Fitness Enthusiasts', 'Keeping fit as a parent', '2021-06-01'),
('Tech-Savvy Parents', 'Integrating technology in parenting', '2021-07-01');

INSERT INTO user_groups (user_id, group_id, JoinDate) VALUES
(1, 1, '2021-01-01'),
(2, 2, '2021-02-01'),
(3, 3, '2021-03-01'),
(4, 4, '2021-04-01'),
(5, 5, '2021-05-01'),
(6, 6, '2021-06-01'),
(1, 7, '2021-07-01');

INSERT INTO events (Title, Description, Location, Date, Time, Capacity, Organizer, ContactEmail) VALUES
('Parenting Workshop', 'Join us for a parenting workshop covering various topics.', 'New York', '2023-01-20', '14:00', 50, 'Parenting Association', 'info@parentingassociation.com'),
('Family Fun Day', 'A day of fun activities for families at the park.', 'Los Angeles', '2023-02-15', '10:00', 100, 'Community Center', 'info@communitycenter.org'),
('Kids Educational Fair', 'An educational fair for kids with interactive exhibits.', 'Chicago', '2023-03-10', '11:30', 80, 'Education Expo', 'info@educationexpo.com'),
('Parenting Seminar', 'Learn effective parenting strategies from experts.', 'Miami', '2023-04-05', '15:30', 60, 'Parenting Solutions', 'info@parentingsolutions.org'),
('Outdoor Adventure Day', 'Explore the great outdoors with your family.', 'Seattle', '2023-05-12', '09:00', 70, 'Adventure Club', 'info@adventureclub.com'),
('Cooking Class for Kids', 'A cooking class for children to learn new recipes.', 'Denver', '2023-06-18', '13:00', 40, 'Chef's' Kitchen', 'info@chefskitchen.com'),
('Family Fitness Challenge', 'Get active as a family with our fitness challenge.', 'Brooklyn', '2023-07-25', '16:30', 90, 'Fitness Hub', 'info@fitnesshub.com');


INSERT INTO resources (Title, Type, Link, LocationBased, Location) VALUES
('Legal Aid for Single Fathers', 'Legal', 'legalaid.com', TRUE, 'New York'),
('Financial Planning for Parents', 'Financial', 'finance4parents.com', FALSE, ''),
('Childcare Services in Brooklyn', 'Childcare', 'childcarebrooklyn.com', TRUE, 'Brooklyn'),
('Online Educational Resources', 'Education', 'eduonline.com', FALSE, ''),
('Health and Wellness Tips', 'Health', 'healthyparents.com', FALSE, ''),
('Parenting Podcasts', 'Entertainment', 'parentpodcasts.com', FALSE, ''),
('Community Support Groups', 'Community', 'supportgroups.com', TRUE, 'Los Angeles');

INSERT INTO professional_vchats (Topic, Speaker, Date, Time, ArchiveLink, isLive, Archived) VALUES
('Effective Parenting', 'Dr. Smith', '2021-01-01', '19:00', 'archive1.link', FALSE, TRUE),
('Financial Management', 'John Doe', '2021-02-01', '20:00', 'archive2.link', FALSE, TRUE),
('Child Education', 'Jane Doe', '2021-03-01', '18:00', 'archive3.link', TRUE, FALSE),
('Health and Fitness', 'Dr. Green', '2021-04-01', '17:00', 'archive4.link', TRUE, FALSE),
('Cooking Healthy Meals', 'Chef Ryan', '2021-05-01', '16:00', 'archive5.link', FALSE, TRUE),
('Mental Health Awareness', 'Dr. Brown', '2021-06-01', '15:00', 'archive6.link', FALSE, TRUE),
('Technology for Kids', 'Tech Guru', '2021-07-01', '14:00', 'archive7.link', TRUE, FALSE);

INSERT INTO social_media_accounts (user_id, SocialMediaPlatform, SocialMediaID, ProfileURL, ConnectedOn) VALUES
(1, 'Facebook', 'fb_id_1', 'facebook.com/user1', '2021-01-01 10:00:00'),
(2, 'Twitter', 'tw_id_2', 'twitter.com/user2', '2021-02-02 11:00:00'),
(3, 'Instagram', 'ig_id_3', 'instagram.com/user3'),

INSERT INTO user_connections (user1_id, user2_id, ConnectionOn) VALUES
(1, 2, '2021-01-01 12:00:00'),
(1, 3, '2021-01-02 12:00:00'),
(2, 3, '2021-01-03 12:00:00'),
(2, 4, '2021-01-04 12:00:00'),
(3, 4, '2021-01-05 12:00:00'),
(3, 5, '2021-01-06 12:00:00'),
(4, 5, '2021-01-07 12:00:00');

INSERT INTO recommendations (user_id, Title, Description, Link, recommendedOn) VALUES
(1, 'Great Parenting Book', 'A book on modern parenting techniques', 'parentingbook.com', '2021-01-01'),
(2, 'Educational Apps for Kids', 'Apps to help with child education', 'eduapps.com', '2021-02-02'),
(3, 'Local Childcare Services', 'Recommended childcare services in the area', 'childcare.com', '2021-03-03'),
(4, 'Financial Planning for Parents', 'Resources for managing family finances', 'financeparents.com', '2021-04-04'),
(5, 'Healthy Recipes for Kids', 'Nutritious and delicious recipes', 'healthyrecipes.com', '2021-05-05'),
(6, 'Outdoor Activities for Families', 'Great outdoor activities for parents and children', 'outdoorfun.com', '2021-06-06'),
(1, 'Parenting Support Groups', 'Local support groups for single parents', 'supportgroups.com', '2021-07-07');

INSERT INTO affiliates (Name, ServiceOrProduct, DiscountDetails, ContactInfo) VALUES
('Affiliate 8', 'Product', 'Exclusive offer for members', 'Contact: affiliate8@example.com'),
('Affiliate 9', 'Service', '10% discount for members', 'Contact: affiliate9@example.com'),
('Affiliate 10', 'Product', 'Special discount for members', 'Contact: affiliate10@example.com'),
('Affiliate 11', 'Service', '15% off for members', 'Contact: affiliate11@example.com'),
('Affiliate 12', 'Product', 'Limited-time offer for members', 'Contact: affiliate12@example.com'),
('Affiliate 13', 'Service', 'Free trial for members', 'Contact: affiliate13@example.com'),
('Affiliate 14', 'Product', 'Exclusive deal for members', 'Contact: affiliate14@example.com');

INSERT INTO mentorship (MentorID, MenteeID, StartDate, EndDate, Status) VALUES
(1, 2, '2023-01-15', '2023-04-15', 'Active'),
(3, 4, '2023-02-10', '2023-05-10', 'Active'),
(5, 6, '2023-03-20', '2023-06-20', 'Active'),
(2, 1, '2023-04-01', '2023-07-01', 'Active'),
(4, 3, '2023-05-05', '2023-08-05', 'Active'),
(6, 5, '2023-06-15', '2023-09-15', 'Active');

INSERT INTO reviews (UserID, EventID, Rating, Comment, CreatedAt) VALUES
(1, 1, 5, 'Great event! I learned a lot.', '2023-01-15 09:30:00'),
(2, 1, 4, 'Informative and well-organized.', '2023-01-16 11:45:00'),
(3, 2, 5, 'Excellent mentorship program.', '2023-02-10 15:20:00'),
(4, 2, 4, 'Helped me grow in my field.', '2023-02-11 10:15:00'),
(5, 3, 5, 'Amazing experience!', '2023-03-20 14:00:00'),
(6, 3, 4, 'Valuable insights and guidance.', '2023-03-21 13:30:00');

INSERT INTO reports (UserID, EventID, ReportType, Description, CreatedAt) VALUES
(1, 1, 'Inappropriate Content', 'This event had inappropriate content.', '2023-01-15 12:30:00'),
(2, 2, 'Technical Issues', 'Encountered technical problems during the event.', '2023-02-10 14:45:00'),
(3, 3, 'Misconduct', 'One of the participants exhibited misconduct.', '2023-03-20 16:10:00'),
(4, 4, 'Late Start', 'The event started much later than scheduled.', '2023-04-05 09:15:00'),
(5, 5, 'No-show Speaker', 'The event speaker did not show up.', '2023-05-12 17:30:00'),
(6, 6, 'Harassment', 'I experienced harassment during the mentorship program.', '2023-06-25 11:20:00');

INSERT INTO emergency_contacts (user_id, Name, ContactInfo, Description, Location) VALUES
(1, 'NYC Emergency Services', '911', 'Immediate emergency assistance', 'New York'),
(2, 'LA Health Services', '911', 'Health-related emergencies', 'Los Angeles'),
(3, 'Chicago Fire Department', '911', 'Fire-related emergencies', 'Chicago'),
(4, 'Miami Police Department', '911', 'Law enforcement assistance', 'Miami'),
(5, 'Seattle Childcare Services', '800-123-4567', 'Childcare emergencies and support', 'Seattle'),
(6, 'Denver Mental Health Hotline', '800-456-7890', 'Mental health crisis line', 'Denver'),
(1, 'Brooklyn Community Support', '800-789-1234', 'Community and social support services', 'Brooklyn');

-- Legal Documents seed data
INSERT INTO legal_documents (DocumentName, DocumentType, Content, CreatedAt) VALUES
('Terms of Service', 'Terms', 'This is the Terms of Service document.', '2023-01-01 10:00:00'),
('Privacy Policy', 'Privacy', 'This is the Privacy Policy document.', '2023-01-02 11:00:00'),
('User Agreement', 'Agreement', 'This is the User Agreement document.', '2023-01-03 12:00:00'),
('Cookie Policy', 'Policy', 'This is the Cookie Policy document.', '2023-01-04 13:00:00'),
('Code of Conduct', 'Policy', 'This is the Code of Conduct document.', '2023-01-05 14:00:00'),
('Data Usage Policy', 'Policy', 'This is the Data Usage Policy document.', '2023-01-06 15:00:00'),
('Refund Policy', 'Policy', 'This is the Refund Policy document.', '2023-01-07 16:00:00');

-- User Consent seed data
INSERT INTO user_consent (UserID, DocumentID, ConsentDate) VALUES
(1, 1, '2023-01-08 09:30:00'),
(2, 2, '2023-01-09 10:45:00'),
(3, 3, '2023-01-10 11:15:00'),
(4, 4, '2023-01-11 12:30:00'),
(5, 5, '2023-01-12 13:45:00'),
(6, 6, '2023-01-13 14:30:00'),
(7, 7, '2023-01-14 15:45:00');

-- Error Logs seed data
INSERT INTO error_logs (LogType, ErrorMessage, ErrorDetails, LogDate) VALUES
('Application Error', 'An unexpected error occurred.', 'Stack trace and additional details.', '2023-01-15 10:30:00'),
('Database Error', 'Failed to insert data into the events table.', 'Database error message and details.', '2023-01-16 11:45:00'),
('Server Error', 'The server encountered an issue.', 'Server log and error description.', '2023-01-17 12:20:00'),
('Security Alert', 'Unauthorized access attempt detected.', 'IP address and security event details.', '2023-01-18 13:15:00'),
('Performance Issue', 'Application performance degraded.', 'Performance metrics and analysis.', '2023-01-19 14:30:00'),
('Authentication Error', 'Failed login attempt.', 'User information and login details.', '2023-01-20 15:45:00'),
('Payment Gateway Error', 'Payment processing error.', 'Transaction details and error message.', '2023-01-21 16:20:00');

