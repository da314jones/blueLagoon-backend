const Joi = require('joi');
const { groupsValidationSchema } = require('../src/your-schema-module'); // Adjust the path as needed
const { expect } = require('chai');

// Groups Validation Schema
describe('Groups Validation Schema', () => {
    it('should validate a valid groups object', () => {
      const validData = {
        // Valid data for groups schema here
      };
  
      const result = groupsValidationSchema.validate(validData);
      expect(result.error).to.be.null;
    });
  
    it('should return validation error for an invalid groups object', () => {
      const invalidData = {
        // Invalid data for groups schema here
      };
  
      const result = groupsValidationSchema.validate(invalidData);
      expect(result.error).to.exist;
    });
  });