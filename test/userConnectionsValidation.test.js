const { expect } = require('chai');
const { userConnectionsValidationSchema } = require('../src/validations/checkUserConnections.js');

describe('User Connections Validation Schema', () => {
  it('should validate a valid user connection object', () => {
    const validConnection = {
      id: 1,
      user1_id: 2,
      user2_id: 3,
      ConnectionOn: '2023-01-01T00:00:00.000Z'
    };

    const validationResult = userConnectionsValidationSchema.validate(validConnection);
    expect(validationResult.error).to.be.undefined;
  });

  it('should return a validation error for an invalid user connection object', () => {
    const invalidConnection = {
      // invalid object structure
    };

    const validationResult = userConnectionsValidationSchema.validate(invalidConnection);
    expect(validationResult.error).to.exist;
  });
});
