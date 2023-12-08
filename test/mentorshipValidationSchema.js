const Joi = require('joi');
const { mentorshipValidationSchema } = require('../src/validations/checkMentorship.js'); // Adjust the path as needed
const { expect } = require('chai');
const validData = require('../validData/mentorshipValidations.js'); // Update with the correct path
const invalidData = require('../validData/mentorshipValidations.js'); // Update with the correct path

describe('Mentorship Validation Schema', () => {
  it('should validate a valid mentorship object', () => {
    const validMentorshipData = {
      mentor_id: 'mentor123',
      mentee_id: 'mentee456',
      start_date: '2023-03-15',
      end_date: '2023-06-15',
      description: 'Mentoring on web development skills',
    };

    const result = mentorshipValidationSchema.validate(validMentorshipData);
    expect(result.error).to.be.null;
  });

  it('should return a validation error for an invalid mentorship object', () => {
    const invalidMentorshipData = {
      // Missing "mentor_id" field, which is required
      mentee_id: 'User1',
      startDate: '2023-12-15',
      endDate: '2023-12-30',
    };

    const result = mentorshipValidationSchema.validate(invalidMentorshipData);
    expect(result.error).to.exist;
  });
});
