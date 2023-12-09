const { expect } = require('chai');
const { reviewsValidationSchema } = require('../src/validations/checkReviews.js');

describe('Reviews Validation Schema', () => {
    it('should validate a valid reviews object', () => {
        const validReview = {
          id: 1,  // Include if 'id' is part of the validation schema
          user_id: 2,
          EventOrServiceId: 3,
          Rating: 4,
          Comment: 'Great experience!',
          ReviewDate: '2023-01-01T00:00:00.000Z'
        };
      
        const validationResult = reviewsValidationSchema.validate(validReview);
        expect(validationResult.error).to.be.undefined;
      });
    
      it('should return a validation error for an invalid resources object', () => {
        const invalidResource = {
          // ... provide an invalid resource object
        };
    
        const validationResult = reviewsValidationSchema.validate(invalidResource);
        expect(validationResult.error).to.exist;
      });
    });
