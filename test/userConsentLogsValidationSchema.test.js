const Joi = require('joi');
const { userConsentLogsValidationSchema } = require('../src/validations/checkUserConsentLogs.js'); // Adjust the path as needed
const { expect } = require('chai');
const validData = require('../validData/userConsentValidations.js'); // Update with the correct path
const invalidData = require('../validData/userConsentValidations.js'); // Update with the correct path

// User Consent Logs Validation Schema
describe('User Consent Logs Validation Schema', () => {
  it('should validate a valid user consent logs object', () => {
    const validUserConsentLogsData = {
      id: 17, // Replace with a valid ID
      consentType: 'Consent Type',
      user: 'User5', // Replace with actual username
      agreed: true, // Replace with true or false based on consent
    };

    const result = userConsentLogsValidationSchema.validate(validUserConsentLogsData);
    expect(result.error).to.be.null;
  });

  it('should return a validation error for an invalid user consent logs object', () => {
    const invalidUserConsentData = {
      // Missing "consent" field, which is required
      user_id: 'User1',
      date: '2023-12-15',
    };

    const result = userConsentLogsValidationSchema.validate(invalidUserConsentData);
    expect(result.error).to.exist;
  });
});
