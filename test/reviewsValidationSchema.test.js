const Joi = require('joi');
const { reviewsValidationSchema } = require('../src/your-schema-module'); // Adjust the path as needed
const { expect } = require('chai');

// Reviews Validation Schema
describe('Reviews Validation Schema', () => {
    it('should validate a valid reviews object', () => {
      const validData = {
        // Valid data for reviews schema here
      };
  
      const result = reviewsValidationSchema.validate(validData);
      expect(result.error).to.be.null;
    });
  
    it('should return validation error for an invalid reviews object', () => {
      const invalidData = {
        // Invalid data for reviews schema here
      };
  
      const result = reviewsValidationSchema.validate(invalidData);
      expect(result.error).to.exist;
    });
  });