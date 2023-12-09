// professionalVthreadsValidation.test.js

const { expect } = require('chai');
const { professionalVthreadsValidationSchema } = require('../src/validations/checkProfessionalVthreads.js');

describe('Professional Vthreads Validation Schema', () => {
  it('should validate a valid professional video thread object', () => {
    const validProfessionalVthread = {
      id: 1,
      Topic: 'Professional Thread Topic',
      Creator: 'John Doe',
      VideoURL: 'https://example.com/video',
      Date: '2023-01-01',
      Time: '10:00',
      Archived: false,
    };

    const { error } = professionalVthreadsValidationSchema.validate(validProfessionalVthread);
    expect(error).to.be.undefined;
  });

  it('should return a validation error for an invalid professional video thread object', () => {
    const invalidProfessionalVthread = {
      // Missing required fields
    };

    const { error } = professionalVthreadsValidationSchema.validate(invalidProfessionalVthread);
    expect(error).to.exist;
  });
});
