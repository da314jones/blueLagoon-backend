const { expect } = require('chai');
const { userGroupsValidationSchema } = require('../src/validations/checkUserGroup.js');

describe('User Groups Validation Schema', () => {
  it('should validate a valid user group object', () => {
    const validUserGroup = {
      id: 1,
      user_id: 2,
      group_id: 3,
      JoinDate: '2023-01-01'
    };

    const validationResult = userGroupsValidationSchema.validate(validUserGroup);
    expect(validationResult.error).to.be.undefined;
  });

  it('should return a validation error for an invalid user group object', () => {
    const invalidUserGroup = {
      // invalid object structure
    };

    const validationResult = userGroupsValidationSchema.validate(invalidUserGroup);
    expect(validationResult.error).to.exist;
  });
});
