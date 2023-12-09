const { expect } = require('chai');
const { reportsValidationSchema } = require('../src/validations/checkReports.js');

describe('Reports Validation Schema', () => {
    it('should validate a valid reports object', () => {
        const validReport = {
          id: 1,  // Mock ID
          reported_by_user_id: 10,  // Assuming a valid user ID
          reported_user_id: 15,  // Assuming another valid user ID
          Content: 'This is a test report',
          ReportDate: '2023-01-01T00:00:00.000Z',
        };
    
        const validationResult = reportsValidationSchema.validate(validReport);
        expect(validationResult.error).to.be.undefined;
      });

  it('should return a validation error for an invalid reports object', () => {
    const invalidReport = {
      // ... provide an invalid report object
    };

    const validationResult = reportsValidationSchema.validate(invalidReport);
    expect(validationResult.error).to.exist;
  });
});
