const Joi = require('joi');
const { notificationsValidationSchema } = require('../src/your-schema-module'); // Adjust the path as needed
const { expect } = require('chai');

 // Notifications Validation Schema
 describe('Notifications Validation Schema', () => {
    it('should validate a valid notifications object', () => {
      const validData = {
        // Valid data for notifications schema here
      };
  
      const result = notificationsValidationSchema.validate(validData);
      expect(result.error).to.be.null;
    });
  
    it('should return validation error for an invalid notifications object', () => {
      const invalidData = {
        // Invalid data for notifications schema here
      };
  
      const result = notificationsValidationSchema.validate(invalidData);
      expect(result.error).to.exist;
    });
  });