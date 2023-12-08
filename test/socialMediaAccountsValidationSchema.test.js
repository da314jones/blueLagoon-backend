const Joi = require('joi');
const { socialMediaAccountsValidationSchema } = require('../src/your-schema-module'); // Adjust the path as needed
const { expect } = require('chai');

/// Social Media Accounts Validation Schema
describe('Social Media Accounts Validation Schema', () => {
    it('should validate a valid social media accounts object', () => {
      const validData = {
        // Valid data for social media accounts schema here
      };
  
      const result = socialMediaAccountsValidationSchema.validate(validData);
      expect(result.error).to.be.null;
    });
  
    it('should return validation error for an invalid social media accounts object', () => {
      const invalidData = {
        // Invalid data for social media accounts schema here
      };
  
      const result = socialMediaAccountsValidationSchema.validate(invalidData);
      expect(result.error).to.exist;
    });
  });