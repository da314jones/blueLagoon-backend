const { expect } = require('chai');
const { errorLogsValidationSchema } = require('../src/validations/checkErrorLogs.js'); // Adjust the path as needed

describe('Error Logs Validation Schema', () => {
  const validErrorLog = {
    id: 1,
    user_id: 123,
    error_type: 'Database Error',
    error_message: 'Error occurred while querying the database',
    error_time: '2023-01-15T12:00:00Z',
    additional_info: { requestHeaders: { 'user-agent': 'Mozilla/5.0' } },
  };

  const invalidErrorLog = {
    // Missing required fields
  };

  it('should validate a valid error log object', () => {
    const { error } = errorLogsValidationSchema.validate(validErrorLog);
    expect(error).to.be.undefined;
  });

  it('should return a validation error for an invalid error log object', () => {
    const { error } = errorLogsValidationSchema.validate(invalidErrorLog);
    expect(error).to.exist;
  });
});
