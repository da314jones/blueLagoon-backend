const Joi = require('joi');
const { mentorshipValidationSchema } = require('../src/your-schema-module'); // Adjust the path as needed
const { expect } = require('chai');

 // Mentorship Validation Schema
 describe('Mentorship Validation Schema', () => {
    it('should validate a valid mentorship object', () => {
      const validData = {
        // Valid data for mentorship schema here
      };
  
      const result = mentorshipValidationSchema.validate(validData);
      expect(result.error).to.be.null;
    });
  
    it('should return validation error for an invalid mentorship object', () => {
      const invalidData = {
        // Invalid data for mentorship schema here
      };
  
      const result = mentorshipValidationSchema.validate(invalidData);
      expect(result.error).to.exist;
    });
  });