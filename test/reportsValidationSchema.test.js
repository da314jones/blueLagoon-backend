const Joi = require('joi');
const { reportsValidationSchema } = require('../src/validations/checkReports.js'); // Adjust the path as needed
const { expect } = require('chai');
const validData = require('../validData/reportsValidations.js'); // Update with the correct path
const invalidData = require('../validData/reportsValidations.js'); // Update with the correct path

describe('Reports Validation Schema', () => {
  it('should validate a valid reports object', () => {
    const validReportsData = {
      id: 12, // Replace with a valid ID
      title: 'Report Title',
      content: 'This is the content of the report.',
      author: 'User3', // Replace with actual author username
    };

    const result = reportsValidationSchema.validate(validReportsData);
    expect(result.error).to.be.null;
  });

  it('should return a validation error for an invalid reports object', () => {
    const invalidReportsData = {
      // Missing "description" field, which is required
      category: 'Bug',
      timestamp: '2023-12-15T12:00:00Z',
    };

    const result = reportsValidationSchema.validate(invalidReportsData);
    expect(result.error).to.exist;
  });
});
