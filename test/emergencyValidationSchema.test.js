const Joi = require('joi');
const { emergencyValidationSchema } = require('../src/your-schema-module'); // Adjust the path as needed
const { expect } = require('chai');

// ... Test cases for emergency validation schema
describe('Error Validation Schema', () => {
    it('should validate a valid error object', () => {
      const validData = {
        // Valid data for error schema here
      };
  
      const result = errorValidationSchema.validate(validData);
      expect(result.error).to.be.null;
    });
  
    it('should return validation error for an invalid error object', () => {
      const invalidData = {
        // Invalid data for error schema here
      };
  
      const result = errorValidationSchema.validate(invalidData);
      expect(result.error).to.exist;
    });
  });