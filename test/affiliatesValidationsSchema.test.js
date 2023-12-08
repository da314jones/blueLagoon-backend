const Joi = require('joi');
const { affiliatesValidationSchema } = require('../src/validations/checkAffiliates.js'); // Adjust the path as needed
const { expect } = require('chai');
const validData = require('../validData/affiliatesValidations'); // Update with the correct path
const invalidData = require('../validData/affiliatesValidations'); // Update with the correct path

describe('Affiliates Validation Schema', () => {
  it('should validate a valid affiliates object', () => {
    const validAffiliatesData = {
      id: 1,
      name: 'Affiliate Company',
      website: 'https://www.affiliatecompany.com',
    };

    const result = affiliatesValidationSchema.validate(validAffiliatesData);
    expect(result.error).to.be.null;
  });

  it('should return a validation error for an invalid affiliates object', () => {
    const invalidAffiliatesData = {
      // Missing the "name" field, which is required
      website: 'https://www.invalidaffiliate.com',
    };

    const result = affiliatesValidationSchema.validate(invalidAffiliatesData);
    expect(result.error).to.exist;
  });
});
