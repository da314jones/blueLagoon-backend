const { expect } = require('chai');
const { recommendationsValidationSchema } = require('../src/validations/checkRecommendations.js');

describe('Recommendations Validation Schema', () => {
    it('should validate a valid recommendations object', () => {
        const validRecommendation = {
          id: 1,  // Mock ID
          user_id: 10,  // Assuming a valid user_id
          Title: 'Example Recommendation',
          Description: 'This is a test recommendation',
          Link: 'http://example.com',
          recommendedOn: '2023-01-01T00:00:00.000Z',
        };
      
        const validationResult = recommendationsValidationSchema.validate(validRecommendation);
        expect(validationResult.error).to.be.undefined;
      });

  it('should return a validation error for an invalid recommendations object', () => {
    const invalidRecommendation = {
      // ... provide an invalid recommendation object
    };

    const validationResult = recommendationsValidationSchema.validate(invalidRecommendation);
    expect(validationResult.error).to.exist;
  });
});
