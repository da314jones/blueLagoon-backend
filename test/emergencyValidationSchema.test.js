const Joi = require('joi');
const { emergencyValidationSchema } = require('../src/validations/checkEmergencyContacts.js'); // Adjust the path as needed
const { expect } = require('chai');

const validData = require('../validData/emergencyValidations.js'); // Update with the correct path
const invalidData = require('../validData/emergencyValidations.js'); // Update with the correct path


// ... Test cases for emergency validation schema
describe('Error Validation Schema', () => {
    it('should validate a valid error object', () => {
      const validEmergencyData = {
        id: 1,
        type: 'Fire',
        location: 'Building A',
        timestamp: '2023-12-15T12:00:00Z',
      };
      
  
      const result = errorValidationSchema.validate(validData);
      expect(result.error).to.be.null;
    });
  
    it('should return validation error for an invalid error object', () => {
      const invalidEmergencyData = {
        // Missing the "description" field, which is required
        location: '123 Main St, City',
        urgency_level: 'High',
      };
      
      const result = errorValidationSchema.validate(invalidData);
      expect(result.error).to.exist;
    });
  });