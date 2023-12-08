const Joi = require('joi');
const { resourcesValidationSchema } = require('../src/validations/checkResources.js'); // Adjust the path as needed
const { expect } = require('chai');
const validData = require('../validData/resourcesValidations.js'); // Update with the correct path
const invalidData = require('../validData/resourcesValidations.js'); // Update with the correct path

describe('Resources Validation Schema', () => {
  it('should validate a valid resources object', () => {
    const validResourcesData = {
      id: 13, // Replace with a valid ID
      title: 'Resource Title',
      link: 'https://example.com/resource', // Replace with a valid URL
      description: 'This is a description of the resource.',
    };

    const result = resourcesValidationSchema.validate(validResourcesData);
    expect(result.error).to.be.null;
  });

  it('should return a validation error for an invalid resources object', () => {
    const invalidResourcesData = {
      // Missing "name" field, which is required
      url: 'https://example.com/resource',
    };

    const result = resourcesValidationSchema.validate(invalidResourcesData);
    expect(result.error).to.exist;
  });
});
