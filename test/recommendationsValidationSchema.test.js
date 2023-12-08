const Joi = require('joi');
const { recommendationsValidationSchema } = require('../src/validations/checkRecommendations.js'); // Adjust the path as needed
const { expect } = require('chai');
const validData = require('../validData/recommendationsValidations.js'); // Update with the correct path
const invalidData = require('../validData/recommendationsValidations.js'); // Update with the correct path

describe('Recommendations Validation Schema', () => {
  it('should validate a valid recommendations object', () => {
    const validRecommendationsData = {
      id: 11, // Replace with a valid ID
      category: 'Category Name',
      items: ['Item 1', 'Item 2'], // Replace with actual item names
    };

    const result = recommendationsValidationSchema.validate(validRecommendationsData);
    expect(result.error).to.be.null;
  });

  it('should return a validation error for an invalid recommendations object', () => {
    const invalidRecommendationsData = {
      // Missing "content" field, which is required
      type: 'Job',
    };

    const result = recommendationsValidationSchema.validate(invalidRecommendationsData);
    expect(result.error).to.exist;
  });
});
