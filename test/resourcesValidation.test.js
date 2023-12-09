const { expect } = require('chai');
const { resourcesValidationSchema } = require('../src/validations/checkResources.js');

describe('Resources Validation Schema', () => {
    it('should validate a valid resources object', () => {
        const validResource = {
          id: 1,  // Include if 'id' is part of the validation schema
          Title: 'Resource Title',
          Type: 'educational',
          Link: 'http://example.com',
          LocationBased: false,
          Location: 'Online'
        };
      
        const validationResult = resourcesValidationSchema.validate(validResource);
        expect(validationResult.error).to.be.undefined;
      });

  it('should return a validation error for an invalid resources object', () => {
    const invalidResource = {
      // ... provide an invalid resource object
    };

    const validationResult = resourcesValidationSchema.validate(invalidResource);
    expect(validationResult.error).to.exist;
  });
});
