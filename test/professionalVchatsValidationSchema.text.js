const Joi = require('joi');
const { professionalVchatsValidationSchema } = require('../src/your-schema-module'); // Adjust the path as needed
const { expect } = require('chai');

// Professional VChats Validation Schema
describe('Professional VChats Validation Schema', () => {
    it('should validate a valid professional VChats object', () => {
      const validData = {
        // Valid data for professional VChats schema here
      };
  
      const result = professionalVchatsValidationSchema.validate(validData);
      expect(result.error).to.be.null;
    });
  
    it('should return validation error for an invalid professional VChats object', () => {
      const invalidData = {
        // Invalid data for professional VChats schema here
      };
  
      const result = professionalVchatsValidationSchema.validate(invalidData);
      expect(result.error).to.exist;
    });
  });