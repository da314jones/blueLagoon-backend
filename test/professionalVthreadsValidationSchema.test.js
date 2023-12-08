const Joi = require('joi');
const { professionalVthreadsValidationSchema } = require('../src/validations/checkProfessionalVthreads.js'); // Adjust the path as needed
const { expect } = require('chai');
const validData = require('../validData/professionalVthreadsValidations.js'); // Update with the correct path
const invalidData = require('../validData/professionalVthreadsValidations.js'); // Update with the correct path

describe('Professional VThreads Validation Schema', () => {
  it('should validate a valid professional VThreads object', () => {
    const validProfessionalVthreadsData = {
      id: 10, // Replace with a valid ID
      subject: 'Vthread Subject',
      messages: [
        {
          author: 'User1', // Replace with actual author username
          message: 'This is a message in the vthread.',
          timestamp: '2023-12-15T12:30:00Z', // Replace with a valid timestamp
        },
      ],
    };

    const result = professionalVthreadsValidationSchema.validate(validProfessionalVthreadsData);
    expect(result.error).to.be.null;
  });

  it('should return a validation error for an invalid professional VThreads object', () => {
    const invalidProfessionalVthreadData = {
      // Missing "title" field, which is required
      messages: ['Message 1', 'Message 2'],
    };

    const result = professionalVthreadsValidationSchema.validate(invalidProfessionalVthreadData);
    expect(result.error).to.exist;
  });
});
