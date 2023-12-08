const Joi = require('joi');
const { vthreadValidationSchema } = require('../src/validations/checkVthreads.js'); // Adjust the path as needed
const { expect } = require('chai');
const validData = require('../validData/vthreadValidations.js'); // Update with the correct path
const invalidData = require('../validData/vthreadValidations.js'); // Update with the correct path

// Vthread Validation Schema
describe('Vthread Validation Schema', () => {
    it('should validate a valid vthread object', () => {
      const validData = {
        id: 21, // Replace with a valid ID
        title: 'Vthreads Title',
        threads: [
          {
            author: 'User1', // Replace with actual author username
            content: 'This is a thread in vthreads.',
            timestamp: '2023-12-15T16:30:00Z', // Replace with a valid timestamp
          },
        ],
      };
  
      const result = vthreadValidationSchema.validate(validData);
      expect(result.error).to.be.null;
    });
  
    it('should return validation error for an invalid vthread object', () => {
      const invalidVthreadsData = {
        // Missing "title" field, which is required
        messages: ['Message 1', 'Message 2'],
      };
      
      const result = vthreadValidationSchema.validate(invalidData);
      expect(result.error).to.exist;
    });
  });
