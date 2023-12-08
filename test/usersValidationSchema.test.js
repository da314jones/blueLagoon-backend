const Joi = require('joi');
const { expect } = require('chai');
const { usersSchema } = require('../src/validations/checkUsers.js'); // Import the correct schema


describe('Users Validation Schema', () => {
  // Valid data for users schema
  const validData = {
    role: 'admin',
    Email: 'admin@example.com',
    Password: 'admin123',
    ProfilePic: 'https://example.com/admin.jpg',
    Interests: 'Management, Leadership',
    Challenges: 'Team coordination',
    Experiences: '10 years of management',
    Locations: 'Los Angeles',
    JoinDate: '2023-01-10',
    name: 'Admin User',
  };

  // Invalid data for users schema
  const invalidData = {
    // Missing required fields, e.g., Email, Password, name
  };

  it('should validate a valid users object', () => {
    const result = usersSchema.validate(validData);
    expect(result.error).to.be.null;
  });

  it('should return validation error for an invalid users object', () => {
    const result = usersSchema.validate(invalidData);
    expect(result.error).to.exist;
  });
});
