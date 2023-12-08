const Joi = require('joi');
const { recommendationsValidationSchema } = require('../src/your-schema-module'); // Adjust the path as needed
const { expect } = require('chai');

 // Recommendations Validation Schema
 describe('Recommendations Validation Schema', () => {
    it('should validate a valid recommendations object', () => {
      const validData = {
        // Valid data for recommendations schema here
      };
  
      const result = recommendationsValidationSchema.validate(validData);
      expect(result.error).to.be.null;
    });
  
    it('should return validation error for an invalid recommendations object', () => {
      const invalidData = {
        // Invalid data for recommendations schema here
      };
  
      const result = recommendationsValidationSchema.validate(invalidData);
      expect(result.error).to.exist;
    });
  });