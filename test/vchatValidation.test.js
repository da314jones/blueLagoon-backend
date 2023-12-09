const { expect } = require('chai');
const { vchatValidationSchema } = require('../src/validations/checkVchat.js');

describe('Vchat Validation Schema', () => {
  it('should validate a valid vchat object', () => {
    const validVchat = {
      id: 1,
      user_id: 2,
      VideoURL: 'http://example.com/video.mp4',
      ScheduleTime: '2023-01-01T10:00:00.000Z',
      Duration: 60,
      ArchiveLink: 'http://example.com/archive.mp4',
      StartTime: '2023-01-01T10:00:00.000Z',
      EndTime: '2023-01-01T11:00:00.000Z',
      ArchiveURL: 'http://example.com/archive.mp4'
    };

    const validationResult = vchatValidationSchema.validate(validVchat);
    expect(validationResult.error).to.be.undefined;
  });

  it('should return a validation error for an invalid vchat object', () => {
    const invalidVchat = {
      // Invalid object structure
    };

    const validationResult = vchatValidationSchema.validate(invalidVchat);
    expect(validationResult.error).to.exist;
  });
});
