const Joi = require('joi');
const { resourcesValidationSchema } = require('../src/your-schema-module'); // Adjust the path as needed
const { expect } = require('chai');

// Resources Validation Schema
describe('Resources Validation Schema', () => {
    it('should validate a valid resources object', () => {
      const validData = {
        // Valid data for resources schema here
      };
  
      const result = resourcesValidationSchema.validate(validData);
      expect(result.error).to.be.null;
    });
  
    it('should return validation error for an invalid resources object', () => {
      const invalidData = {
        // Invalid data for resources schema here
      };
  
      const result = resourcesValidationSchema.validate(invalidData);
      expect(result.error).to.exist;
    });
  });