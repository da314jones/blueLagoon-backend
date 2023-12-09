const { expect } = require('chai');
const { notificationsValidationSchema } = require('../src/validations/checkNotifications.js');

describe('Notifications Validation Schema', () => {
  it('should validate a valid notification object', () => {
    const validNotification = {
      id: 1,
      user_id: 2,
      Type: 'alert',
      Message: 'This is an alert message.',
      Date: '2023-01-01 12:00:00',
    };

    const { error } = notificationsValidationSchema.validate(validNotification);
    expect(error).to.be.undefined;
  });

  it('should return a validation error for an invalid notification object', () => {
    const invalidNotification = {
      // Missing required fields
    };

    const { error } = notificationsValidationSchema.validate(invalidNotification);
    expect(error).to.exist;
  });
});
