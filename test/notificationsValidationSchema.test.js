const Joi = require('joi');
const { notificationsValidationSchema } = require('../src/validations/checkNotifications.js'); // Adjust the path as needed
const { expect } = require('chai');
const validData = require('../validData/notificationsValidations.js'); // Update with the correct path
const invalidData = require('../validData/notificationsValidations.js'); // Update with the correct path

describe('Notifications Validation Schema', () => {
  it('should validate a valid notifications object', () => {
    const validNotificationsData = {
      id: 22, // Replace with a valid ID
      type: 'Notification Type',
      message: 'This is a notification message.',
      recipient: 'User1', // Replace with the actual recipient username
    };

    const result = notificationsValidationSchema.validate(validNotificationsData);
    expect(result.error).to.be.null;
  });

  it('should return a validation error for an invalid notifications object', () => {
    const invalidNotificationsData = {
      // Missing the "title" field, which is required
      content: 'This is a notification content.',
      user_id: 123,
    };

    const result = notificationsValidationSchema.validate(invalidNotificationsData);
    expect(result.error).to.exist;
  });
});
