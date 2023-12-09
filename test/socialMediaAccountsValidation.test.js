const { expect } = require('chai');
const { socialMediaAccountsValidationSchema } = require('../src/validations/checkSocialMediaAccounts.js');

describe('Social Media Accounts Validation Schema', () => {
  it('should validate a valid social media accounts object', () => {
    const validAccount = {
      id: 1,
      user_id: 2,
      SocialMediaPlatform: 'Facebook',
      SocialMediaID: 'user123',
      ProfileURL: 'http://facebook.com/user123',
      ConnectedOn: '2023-01-01T00:00:00.000Z'
    };

    const validationResult = socialMediaAccountsValidationSchema.validate(validAccount);
    expect(validationResult.error).to.be.undefined;
  });

  it('should return a validation error for an invalid social media accounts object', () => {
    const invalidAccount = {
      id: 'invalid', // Invalid id type
      // Missing user_id, SocialMediaPlatform, SocialMediaID, ProfileURL, ConnectedOn
    };

    const validationResult = socialMediaAccountsValidationSchema.validate(invalidAccount);
    expect(validationResult.error).to.exist;
  });
});
