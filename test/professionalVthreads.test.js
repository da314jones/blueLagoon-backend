const Joi = require('joi');
const { professionalVthreadsValidationSchema } = require('../src/your-schema-module'); // Adjust the path as needed
const { expect } = require('chai');

describe('Professional VThreads Validation Schema', () => {
  it('should validate a valid professional VThreads object', () => {
    const validData = {
      // Valid data for professional VThreads schema here
    };

    const result = professionalVthreadsValidationSchema.validate(validData);
    expect(result.error).to.be.null;
  });

  it('should return validation error for an invalid professional VThreads object', () => {
    const invalidData = {
      // Invalid data for professional VThreads schema here
    };

    const result = professionalVthreadsValidationSchema.validate(invalidData);
    expect(result.error).to.exist;
  });
});
