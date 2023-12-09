const { expect } = require('chai');
const { emergencyContactsValidationSchema } = require('../src/validations/checkEmergencyContacts.js'); // Adjust the path as needed

describe('Emergency Contacts Validation Schema', () => {
    const validEmergencyContact = {
        id: 1,
        user_id: 10,
        Name: 'John Doe',
        ContactInfo: '123-456-7890, johndoe@example.com',
        Description: 'Brother, to be contacted in any emergencies',
        Location: '123 Main St, Hometown'
    };

    const invalidEmergencyContact = {
        id: 'abc', // Invalid ID
        user_id: 'xyz', // Invalid user_id
        Name: '', // Invalid: Name is required
        ContactInfo: '', // Invalid: ContactInfo is required
        Description: '', // Invalid: Description is required
        Location: '' // Invalid: Location is required
    };

    it('should validate a valid emergency contact object', () => {
        const { error } = emergencyContactsValidationSchema.validate(validEmergencyContact);
        expect(error).to.be.undefined;
    });

    it('should return a validation error for an invalid emergency contact object', () => {
        const { error } = emergencyContactsValidationSchema.validate(invalidEmergencyContact);
        expect(error).to.exist;
    });
});
