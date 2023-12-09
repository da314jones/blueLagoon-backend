const { expect } = require('chai');
const { legalDocumentsValidationSchema } = require('../src/validations/checkLegalDocuments.js');

describe('Legal Documents Validation Schema', () => {
  it('should validate a valid legal document object', () => {
    const validLegalDocument = {
      id: 1,
      title: 'Privacy Policy',
      content: 'This is the privacy policy content.',
      version: 1,
      effective_date: '2023-01-01',
    };

    const { error } = legalDocumentsValidationSchema.validate(validLegalDocument);
    expect(error).to.be.undefined;
  });

  it('should return a validation error for an invalid legal document object', () => {
    const invalidLegalDocument = {
      // Missing required fields
    };

    const { error } = legalDocumentsValidationSchema.validate(invalidLegalDocument);
    expect(error).to.exist;
  });
});
