const Joi = require('joi');
const { userRegisterValidationSchema } = require('../src/your-schema-module'); // Adjust the path as needed
const { expect } = require('chai');

// User Register Validation Schema
describe('User Register Validation Schema', () => {
    it('should validate a valid user register object', () => {
      const validData = {
        // Valid data for user register schema here
      };
  
      const result = userRegisterValidationSchema.validate(validData);
      expect(result.error).to.be.null;
    });
  
    it('should return validation error for an invalid user register object', () => {
      const invalidData = {
        // Invalid data for user register schema here
      };
  
      const result = userRegisterValidationSchema.validate(invalidData);
      expect(result.error).to.exist;
    });
  });