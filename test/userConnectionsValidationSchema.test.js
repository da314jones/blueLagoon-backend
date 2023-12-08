const Joi = require('joi');
const { userConnectionsValidationSchema } = require('../src/validations/checkUserConnections.js'); // Adjust the path as needed
const { expect } = require('chai');
const validData = require('../validData/validUserConnectionsData.js'); // Update with the correct path for valid data
const invalidData = require('../validData/invalidUserConnectionsData.js'); // Update with the correct path for invalid data

// User Connections Validation Schema
describe('User Connections Validation Schema', () => {
  it('should validate a valid user connections object', () => {
    const result = userConnectionsValidationSchema.validate(validData);
    expect(result.error).to.be.null;
  });

  it('should return a validation error for an invalid user connections object', () => {
    const result = userConnectionsValidationSchema.validate(invalidData);
    expect(result.error).to.exist;
  });
});
