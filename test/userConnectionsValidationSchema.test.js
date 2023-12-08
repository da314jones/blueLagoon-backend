const Joi = require('joi');
const { userConnectionsValidationSchema } = require('../src/your-schema-module'); // Adjust the path as needed
const { expect } = require('chai');

 // User Connections Validation Schema
 describe('User Connections Validation Schema', () => {
    it('should validate a valid user connections object', () => {
      const validData = {
        // Valid data for user connections schema here
      };
  
      const result = userConnectionsValidationSchema.validate(validData);
      expect(result.error).to.be.null;
    });
  
    it('should return validation error for an invalid user connections object', () => {
      const invalidData = {
        // Invalid data for user connections schema here
      };
  
      const result = userConnectionsValidationSchema.validate(invalidData);
      expect(result.error).to.exist;
    });
  });