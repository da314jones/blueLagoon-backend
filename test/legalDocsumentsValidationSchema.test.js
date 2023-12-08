const Joi = require('joi');
const { legalDocumentsValidationSchema } = require('../src/validations/checkLegalDocuments.js'); // Adjust the path as needed
const { expect } = require('chai');
const validData = require('../validData/legalDocumentsValidation.js'); // Update with the correct path
const invalidData = require('../validData/legalDocumentsValidation.js'); // Update with the correct path

describe('Legal Documents Validation Schema', () => {
  it('should validate a valid legal documents object', () => {
    const validLegalDocsData = {
      id: 1,
      title: "Sample Legal Document",
      content: "This is the content of the legal document.",
      version: 1,
      effective_date: "2023-01-01",
    };

    const result = legalDocumentsValidationSchema.validate(validLegalDocsData);
    expect(result.error).to.be.null;
  });

  it('should return a validation error for an invalid legal documents object', () => {
    const invalidLegalDocsData = {
      // Missing the "title" field, which is required
      content: 'This is a legal document content.',
      version: 1,
      effective_date: '2023-01-01',
    };

    const result = legalDocumentsValidationSchema.validate(invalidLegalDocsData);
    expect(result.error).to.exist;
  });
});
