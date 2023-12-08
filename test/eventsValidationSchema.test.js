const Joi = require('joi');
const { eventsValidationSchema } = require('../src/your-schema-module'); // Adjust the path as needed
const { expect } = require('chai');

// Events Validation Schema
describe('Events Validation Schema', () => {
    it('should validate a valid events object', () => {
      const validData = {
        // Valid data for events schema here
      };
  
      const result = eventsValidationSchema.validate(validData);
      expect(result.error).to.be.null;
    });
  
    it('should return validation error for an invalid events object', () => {
      const invalidData = {
        // Invalid data for events schema here
      };
  
      const result = eventsValidationSchema.validate(invalidData);
      expect(result.error).to.exist;
    });
  });