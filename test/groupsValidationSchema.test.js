const Joi = require('joi');
const { groupsValidationSchema } = require('../src/validations/checkGroups.js'); // Adjust the path as needed
const { expect } = require('chai');
const validData = require('../validData/groupsValidations.js'); // Update with the correct path
const invalidData = require('../validData/groupsValidations.js'); // Update with the correct path

describe('Groups Validation Schema', () => {
  it('should validate a valid groups object', () => {
    const validGroupsData = {
      GroupName: 'Web Developers Community',
      Description: 'A community for web developers to collaborate and share knowledge.',
      Members: ['user1', 'user2', 'user3'],
    };

    const result = groupsValidationSchema.validate(validGroupsData);
    expect(result.error).to.be.null;
  });

  it('should return a validation error for an invalid groups object', () => {
    const invalidGroupsData = {
      // Missing the "GroupName" field, which is required
      description: 'This is a group description.',
      members: ['user1', 'user2'],
    };

    const result = groupsValidationSchema.validate(invalidGroupsData);
    expect(result.error).to.exist;
  });
});
