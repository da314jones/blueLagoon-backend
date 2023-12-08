const Joi = require('joi');
const { userGroupValidationSchema } = require('../src/your-schema-module'); // Adjust the path as needed
const { expect } = require('chai');

   // User Group Validation Schema
   describe('User Group Validation Schema', () => {
    it('should validate a valid user groups object', () => {
      const validData = {
        // Valid data for user group schema here
      };
  
      const result = userGroupValidationSchema.validate(validData);
      expect(result.error).to.be.null;
    });
  
    it('should return validation error for an invalid user groups object', () => {
      const invalidData = {
        // Invalid data for user group schema here
      };
  
      const result = userGroupValidationSchema.validate(invalidData);
      expect(result.error).to.exist;
    });
  });
  