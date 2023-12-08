const Joi = require('joi');
const { affiliatesValidationSchema } = require('../src/your-schema-module'); // Adjust the path as needed
const { expect } = require('chai');

describe('Affiliates Validation Schema', () => {
  it('should validate a valid affiliates object', () => {
    const validData = {
      // Valid data for affiliates schema here
    };

    const result = affiliatesValidationSchema.validate(validData);
    expect(result.error).to.be.null;
  });

  it('should return validation error for an invalid affiliates object', () => {
    const invalidData = {
      // Invalid data for affiliates schema here
    };

    const result = affiliatesValidationSchema.validate(invalidData);
      expect(result.error).to.exist;

  });
});