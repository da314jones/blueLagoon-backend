const Joi = require('joi');
const { eventsValidationSchema } = require('../src/validations/checkEvents.js'); // Adjust the path as needed
const { expect } = require('chai');
const validData = require('../validData/eventsValidations.js'); // Update with the correct path
const invalidData = require('../validData/eventsValidations.js'); // Update with the correct path

describe('Events Validation Schema', () => {
  it('should validate a valid events object', () => {
    const validEventData = {
      name: 'Tech Conference 2023',
      date: '2023-12-20',
      location: 'Event Location',
    };

    const result = eventsValidationSchema.validate(validEventData);
    expect(result.error).to.be.null;
  });

  it('should return a validation error for an invalid events object', () => {
    const invalidEventData = {
      // Missing "name" field, which is required
      date: '2023-12-20',
      location: 'Event Location',
    };

    const result = eventsValidationSchema.validate(invalidEventData);
    expect(result.error).to.exist;
  });
});
