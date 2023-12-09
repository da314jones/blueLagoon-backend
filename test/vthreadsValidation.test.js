const { expect } = require('chai');
const { vthreadsValidationSchema } = require('../src/validations/checkVthreads.js');

describe('Vthreads Validation Schema', () => {
  it('should validate a valid vthreads object', () => {
    const validVthread = {
      id: 1,
      user_id: 2,
      VideoURL: 'http://example.com/video.mp4',
      Title: 'Sample Video Thread',
      Category: 'Education',
      CreationDate: '2023-01-01'
    };

    const validationResult = vthreadsValidationSchema.validate(validVthread);
    expect(validationResult.error).to.be.undefined;
  });

  it('should return a validation error for an invalid vthreads object', () => {
    const invalidVthread = {
      // Invalid object structure
    };

    const validationResult = vthreadsValidationSchema.validate(invalidVthread);
    expect(validationResult.error).to.exist;
  });
});
