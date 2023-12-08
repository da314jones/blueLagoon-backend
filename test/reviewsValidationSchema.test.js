const Joi = require('joi');
const { reviewsValidationSchema } = require('../src/validations/checkReviews.js'); // Adjust the path as needed
const { expect } = require('chai');
const validData = require('../validData/reviewsValidations.js'); // Update with the correct path
const invalidData = require('../validData/reviewsValidations.js'); // Update with the correct path

describe('Reviews Validation Schema', () => {
  it('should validate a valid reviews object', () => {
    const validReviewsData = {
      id: 14, // Replace with a valid ID
      product: 'Product Name',
      rating: 4, // Replace with a valid rating
      reviewText: 'This is a review for the product.',
      reviewer: 'User4', // Replace with actual reviewer username
    };

    const result = reviewsValidationSchema.validate(validReviewsData);
    expect(result.error).to.be.null;
  });

  it('should return a validation error for an invalid reviews object', () => {
    const invalidReviewsData = {
      // Missing "content" field, which is required
      rating: 4,
    };

    const result = reviewsValidationSchema.validate(invalidReviewsData);
    expect(result.error).to.exist;
  });
});
