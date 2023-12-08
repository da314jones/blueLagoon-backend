const Joi = require('joi');
const { expect } = require('chai');
const { userRegistrationSchema } = require('../src/validations/checkUserRegister.js'); // Import the correct schema

describe('User Registration Validation Schema', () => {
  // Valid data for user registration schema
  const validUserData = {
    role: 'user',
    Email: 'user@example.com',
    Password: 'password123',
    ProfilePic: 'https://example.com/profile.jpg',
    Interests: 'Programming, Gaming',
    Challenges: 'Project deadlines',
    Experiences: '5 years of web development',
    Locations: 'New York',
    JoinDate: '2023-01-15',
    name: 'John Doe',
  };

  // Invalid data for user registration schema
  const invalidUserData = {
    // Missing required fields, e.g., Email, Password, name
  };

  it('should validate a valid user registration object', () => {
    const result = userRegistrationSchema.validate(validUserData);
    expect(result.error).to.be.null;
  });

  it('should return validation error for an invalid user registration object', () => {
    const result = userRegistrationSchema.validate(invalidUserData);
    expect(result.error).to.exist;
  });
});
