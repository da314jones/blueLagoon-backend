const { expect } = require('chai');
const { mentorshipValidationSchema } = require('../src/validations/checkMentorship.js');

describe('Mentorship Validation Schema', () => {
  it('should validate a valid mentorship object', () => {
    const validMentorship = {
      id: 1,
      mentor_id: 2,
      mentee_id: 3,
      StartDate: '2023-01-01',
      Notes: 'This is a mentorship relationship.',
    };

    const { error } = mentorshipValidationSchema.validate(validMentorship);
    expect(error).to.be.undefined;
  });

  it('should return a validation error for an invalid mentorship object', () => {
    const invalidMentorship = {
      // Missing required fields
    };

    const { error } = mentorshipValidationSchema.validate(invalidMentorship);
    expect(error).to.exist;
  });
});
