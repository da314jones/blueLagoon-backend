const Joi = require('joi');
const { professionalVchatsValidationSchema } = require('../src/validations/checkProfessionalVchats.js'); // Adjust the path as needed
const { expect } = require('chai');
const validData = require('../validData/professionalVchatsValidations.js'); // Update with the correct path
const invalidData = require('../validData/professionalVchatsValidations.js'); // Update with the correct path

describe('Professional VChats Validation Schema', () => {
  it('should validate a valid professional VChats object', () => {
    const validProfessionalVchatsData = {
      id: 9, // Replace with a valid ID
      title: 'Professional Vchat Title',
      description: 'This is a professional vchat description.',
      date: '2023-12-15T10:00:00Z', // Replace with a valid date
      attendees: ['User1', 'User2'],
    };

    const result = professionalVchatsValidationSchema.validate(validProfessionalVchatsData);
    expect(result.error).to.be.null;
  });

  it('should return a validation error for an invalid professional VChats object', () => {
    const invalidProfessionalVchatsData = {
      // Missing "topic" field, which is required
      participants: ['User1', 'User2'],
      startTime: '2023-12-15T14:00:00Z',
      endTime: '2023-12-15T15:00:00Z',
    };

    const result = professionalVchatsValidationSchema.validate(invalidProfessionalVchatsData);
    expect(result.error).to.exist;
  });
});
