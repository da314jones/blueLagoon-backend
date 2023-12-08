const Joi = require('joi');
const { socialMediaAccountsValidationSchema } = require('../src/validations/checkSocialMediaAccounts.js'); // Adjust the path as needed
const { expect } = require('chai');
const validData = require('../validData/socialMediaAccountsValidations.js'); // Update with the correct path
const invalidData = require('../validData/socialMediaAccountsValidations.js'); // Update with the correct path

// Social Media Accounts Validation Schema
describe('Social Media Accounts Validation Schema', () => {
  it('should validate a valid social media accounts object', () => {
    const validSocialMediaAccountsData = {
      id: 15, // Replace with a valid ID
      platform: 'Social Media Platform',
      handle: 'social_media_handle', // Replace with a valid social media handle
      followerCount: 1000, // Replace with a valid follower count
    };

    const result = socialMediaAccountsValidationSchema.validate(validSocialMediaAccountsData);
    expect(result.error).to.be.null;
  });

  it('should return a validation error for an invalid social media accounts object', () => {
    const invalidSocialMediaAccountsData = {
      // Missing "platform" field, which is required
      username: 'user123',
    };

    const result = socialMediaAccountsValidationSchema.validate(invalidSocialMediaAccountsData);
    expect(result.error).to.exist;
  });
});
