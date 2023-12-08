const Joi = require('joi');
const { reportsValidationSchema } = require('../src/your-schema-module'); // Adjust the path as needed
const { expect } = require('chai');

// Reports Validation Schema
describe('Reports Validation Schema', () => {
    it('should validate a valid reports object', () => {
      const validData = {
        // Valid data for reports schema here
      };
  
      const result = reportsValidationSchema.validate(validData);
      expect(result.error).to.be.null;
    });
  
    it('should return validation error for an invalid reports object', () => {
      const invalidData = {
        // Invalid data for reports schema here
      };
  
      const result = reportsValidationSchema.validate(invalidData);
      expect(result.error).to.exist;
    });
  });