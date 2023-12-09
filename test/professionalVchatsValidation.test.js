const { expect } = require('chai');
const { professionalVchatsValidationSchema } = require('../src/validations/checkProfessionalVchats.js');

describe('Professional Vchats Validation Schema', () => {
  it('should validate a valid professional video chat object', () => {
    const validProfessionalVchat = {
      id: 1,
      Topic: 'Professional Chat Topic',
      Speaker: 'John Doe',
      VideoURL: 'https://example.com/video',
      Date: '2023-01-01',
      Time: '12:00',
      ArchiveLink: 'https://example.com/archive',
      isLive: true,
      Archived: false,
    };

    const { error } = professionalVchatsValidationSchema.validate(validProfessionalVchat);
    expect(error).to.be.undefined;
  });

  it('should return a validation error for an invalid professional video chat object', () => {
    const invalidProfessionalVchat = {
      // Missing required fields
    };

    const { error } = professionalVchatsValidationSchema.validate(invalidProfessionalVchat);
    expect(error).to.exist;
  });
});
