const Joi = require('joi');
const { userConsentLogsValidationSchema } = require('../src/your-schema-module'); // Adjust the path as needed
const { expect } = require('chai');

// User Consent Logs Validation Schema
describe('User Consent Logs Validation Schema', () => {
    it('should validate a valid user consent logs object', () => {
      const validData = {
        // Valid data for user consent logs schema here
      };
  
      const result = userConsentLogsValidationSchema.validate(validData);
      expect(result.error).to.be.null;
    });
  
    it('should return validation error for an invalid user consent logs object', () => {
      const invalidData = {
        // Invalid data for user consent logs schema here
      };
  
      const result = userConsentLogsValidationSchema.validate(invalidData);
      expect(result.error).to.exist;
    });
  }); 
