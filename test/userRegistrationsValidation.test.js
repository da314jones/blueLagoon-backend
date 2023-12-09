const { expect } = require('chai');
const { userRegistrationsValidationSchema } = require('../src/validations/checkUserRegister.js');

describe('User Registrations Validation Schema', () => {
  it('should validate a valid user registration object', () => {
    const validUserRegistration = {
      id: 1,
      user_id: 2,
      RegistrationDate: '2023-01-01',
      AdditionalInfo: 'Interested in technology and programming'
    };

    const validationResult = userRegistrationsValidationSchema.validate(validUserRegistration);
    expect(validationResult.error).to.be.undefined;
  });

  it('should return a validation error for an invalid user registration object', () => {
    const invalidUserRegistration = {
      id: 1,
      // Missing user_id and RegistrationDate
    };

    const validationResult = userRegistrationsValidationSchema.validate(invalidUserRegistration);
    expect(validationResult.error).to.exist;
  });
});
