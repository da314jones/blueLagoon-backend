const Joi = require('joi');
const { usersValidationSchema } = require('../src/your-schema-module'); // Adjust the path as needed
const { expect } = require('chai');

// Users Validation Schema
describe('Users Validation Schema', () => {
    it('should validate a valid users object', () => {
      const validData = {
        // Valid data for users schema here
      };
  
      const result = usersValidationSchema.validate(validData);
      expect(result.error).to.be.null;
    });
  
    it('should return validation error for an invalid users object', () => {
      const invalidData = {
        // Invalid data for users schema here
      };
  
      const result = usersValidationSchema.validate(invalidData);
      expect(result.error).to.exist;
    });
  });