const Joi = require('joi');
const { userGroupSchema } = require('../src/validations/checkUserGroup.js'); // Import the correct schema
const { expect } = require('chai');
const validData = {
  group_id: 1,
  user_id: 2,
  role: 'member',
};

const invalidData = {
  // Missing required fields, e.g., group_id, user_id, role
};

describe('User Group Validation Schema', () => {
  it('should validate a valid user group object', () => {
    const result = userGroupSchema.validate(validData);
    expect(result.error).to.be.null;
  });

  it('should return a validation error for an invalid user group object', () => {
    const result = userGroupSchema.validate(invalidData);
    expect(result.error).to.exist;
  });
});
