const Joi = require('joi');
const { errorLogsValidationSchema } = require('../src/validations/checkErrorLogs.js'); // Adjust the path as needed
const { expect } = require('chai');
const validData = require('../validData/errorValidations.js'); // Update with the correct path
const invalidData = require('../validData/errorValidations.js'); // Update with the correct path

describe('Error Logs Validation Schema', () => {
  it('should validate a valid error object', () => {
    const validErrorData = {
      id: 1,
      message: 'An error occurred',
      timestamp: '2023-12-15T12:00:00Z',
    };

    const result = errorLogsValidationSchema.validate(validErrorData);
    expect(result.error).to.be.null;
  });

  it('should return a validation error for an invalid error object', () => {
    const invalidErrorData = {
      // Missing the "error_message" field, which is required
      error_code: 'ERR123',
    };

    const result = errorLogsValidationSchema.validate(invalidErrorData);
    expect(result.error).to.exist;
  });
});
