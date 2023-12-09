const { expect } = require('chai');
const { eventsValidationSchema } = require('../src/validations/checkEvents.js'); // Adjust the path as needed

describe('Events Validation Schema', () => {
  const validEvent = {
    id: 1,
    Title: 'Event Title',
    Description: 'Description of the event',
    Location: 'Event Location',
    Category: 'Event Category',
    SignUpLink: 'https://example.com/signup',
    Date: '2023-12-31',
    Time: '12:00',
  };

  const invalidEvent = {
    // Missing required fields
  };

  it('should validate a valid event object', () => {
    const { error } = eventsValidationSchema.validate(validEvent);
    expect(error).to.be.undefined;
  });

  it('should return a validation error for an invalid event object', () => {
    const { error } = eventsValidationSchema.validate(invalidEvent);
    expect(error).to.exist;
  });
});
