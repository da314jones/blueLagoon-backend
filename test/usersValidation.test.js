const { expect } = require('chai');
const { usersValidationSchema } = require('../src/validations/checkUsers.js');

describe('Users Validation Schema', () => {
  it('should validate a valid user object', () => {
    const validUser = {
      id: 1,
      role: 'user',
      Email: 'user@example.com',
      Password: 'SecurePassword123',
      ProfilePic: 'http://example.com/profilepic.jpg',
      Interests: 'Technology, Programming',
      Challenges: 'Learning new languages',
      Experiences: '5 years in software development',
      Locations: 'New York',
      JoinDate: '2023-01-01'
    };

    const validationResult = usersValidationSchema.validate(validUser);
    expect(validationResult.error).to.be.undefined;
  });

  it('should return a validation error for an invalid user object', () => {
    const invalidUser = {
      id: 'one', // Invalid id type
      role: 'user',
      // Missing Email, Password, and other required fields
    };

    const validationResult = usersValidationSchema.validate(invalidUser);
    expect(validationResult.error).to.exist;
  });
});
