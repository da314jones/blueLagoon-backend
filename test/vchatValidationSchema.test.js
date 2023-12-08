const Joi = require('joi');
const { vchatValidationSchema } = require('../src/your-schema-module'); // Adjust the path as needed
const { expect } = require('chai');

// Vchat Validation Schema
describe('Vchat Validation Schema', () => {
    it('should validate a valid vchat object', () => {
      const validData = {
        // Valid data for vchat schema here
      };
  
      const result = vchatValidationSchema.validate(validData);
      expect(result.error).to.be.null;
    });
  
    it('should return validation error for an invalid vchat object', () => {
      const invalidData = {
        // Invalid data for vchat schema here
      };
  
      const result = vchatValidationSchema.validate(invalidData);
      expect(result.error).to.exist;
    });
  });