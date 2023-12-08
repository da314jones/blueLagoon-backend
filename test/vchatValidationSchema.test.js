const Joi = require('joi');
const { vchatValidationSchema } = require('../src/validations/checkVchat.js'); // Adjust the path as needed
const { expect } = require('chai');

const validData = require('../validData/vchatValidations.js'); // Update with the correct path
const invalidData = require('../validData/vchatValidations.js'); // Update with the correct path

// Vchat Validation Schema
describe('Vchat Validation Schema', () => {
    it('should validate a valid vchat object', () => {
      const validData = {
        id: 20, // Replace with a valid ID
        topic: 'Vchat Topic',
        participants: ['User1', 'User2'], // Replace with actual participant usernames
        startTime: '2023-12-15T14:00:00Z', // Replace with a valid start time
        endTime: '2023-12-15T15:00:00Z', // Replace with a valid end time
      };
  
      const result = vchatValidationSchema.validate(validData);
      expect(result.error).to.be.null;
    });
  
    it('should return validation error for an invalid vchat object', () => {
      const invalidVchatData = {
        // Missing "topic" field, which is required
        participants: ['User1', 'User2'],
        startTime: '2023-12-15T14:00:00Z',
        endTime: '2023-12-15T15:00:00Z',
      };
      
      const result = vchatValidationSchema.validate(invalidData);
      expect(result.error).to.exist;
    });
  });
