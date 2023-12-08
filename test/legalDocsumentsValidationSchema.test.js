const Joi = require('joi');
const { legalDocumentsValidationSchema } = require('../src/your-schema-module'); // Adjust the path as needed
const { expect } = require('chai');

 // Legal Docs Validation Schema
 describe('Legal Docs Validation Schema', () => {
    it('should validate a valid legal docs object', () => {
      const validData = {
        // Valid data for legal docs schema here
      };
  
      const result = legalDocumentsValidationSchema.validate(validData);
      expect(result.error).to.be.null;
    });
  
    it('should return validation error for an invalid legal docs object', () => {
      const invalidData = {
        // Invalid data for legal docs schema here
      };
  
      const result = legalDocumentsValidationSchema.validate(invalidData);
      expect(result.error).to.exist;
    });
  });