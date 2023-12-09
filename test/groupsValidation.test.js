const { expect } = require('chai');
const { groupsValidationSchema } = require('../src/validations/checkGroups'); // Replace with the actual path to your validation module

describe('Group Validation Schema', () => {
  it('should validate a valid group object', () => {
    const validGroup = {
      id: 1,
      GroupName: 'Sample Group',
      Description: 'A test group',
      CreationDate: '2023-01-01',
    };

    const validationResult = groupsValidationSchema.validate(validGroup);
    expect(validationResult.error).to.be.undefined; 
  });

  it('should return a validation error for an invalid group object', () => {
    const invalidGroup = {
      id: 'invalid', // Invalid data type
      GroupName: '', // Required field missing
      Description: 'A test group',
      CreationDate: 'invalid-date-format', // Invalid date format
    };

    const validationResult = groupsValidationSchema.validate(invalidGroup);
    expect(validationResult.error).to.exist;
  });
});
