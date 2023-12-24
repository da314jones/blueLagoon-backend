const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;
const request = require('supertest');
const app = require('../app');
// const { vthreadsValidationSchema } = require('../validations/checkVthreads');const { expect } = require('chai');

describe('Affiliates Validation Schema', () => {
    const validAffiliate = {
        id: 1,
        Name: 'XYZ Partners',
        ServiceOrProduct: 'Web hosting services',
        DiscountDetails: '20% off on annual subscriptions',
        ContactInfo: 'contact@xyzpartners.com'
    };

    const invalidAffiliate = {
        id: 'one', // Invalid ID
        Name: '', // Invalid: Name is required
        ServiceOrProduct: '', // Invalid: ServiceOrProduct is required
        DiscountDetails: '', // Invalid: DiscountDetails is required
        ContactInfo: '' // Invalid: ContactInfo is required
    };

    it('should validate a valid affiliate object', () => {
        const { error } = affiliatesValidationSchema.validate(validAffiliate);
        expect(error).to.be.undefined;
    });

    it('should return a validation error for an invalid affiliate object', () => {
        const { error } = affiliatesValidationSchema.validate(invalidAffiliate);
        expect(error).to.exist;
    });
});
