const Joi = require('joi');
const { vthreadValidationSchema } = require('../src/your-schema-module'); // Adjust the path as needed
const { expect } = require('chai');

// Vthread Validation Schema
describe('Vthread Validation Schema', () => {
    it('should validate a valid vthread object', () => {
      const validData = {
        // Valid data for vthread schema here
      };
  
      const result = vthreadValidationSchema.validate(validData);
      expect(result.error).to.be.null;
    });
  
    it('should return validation error for an invalid vthread object', () => {
      const invalidData = {
        // Invalid data for vthread schema here
      };
  
      const result = vthreadValidationSchema.validate(invalidData);
      expect(result.error).to.exist;
    });
  });