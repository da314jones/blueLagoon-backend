const request = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('User Registrations API Tests', () => {
    let registrationId;

    it('should create a new registration', async () => {
        const registrationData = {
            user_id: 1, // Replace with actual user ID
            email: 'test@example.com',
            // ... other fields
        };
        const res = await request(app).post('/userRegistrations').send(registrationData);
        expect(res.statusCode).to.equal(201);
        registrationId = res.body.registration_id;
        expect(res.body).to.include(registrationData);
    });

    it('should get a registration by ID', async () => {
        const res = await request(app).get(`/userRegistrations/${registrationId}`);
        expect(res.statusCode).to.equal(200);
        expect(res.body.registration_id).to.equal(registrationId);
    });

    it('should update a registration', async () => {
        const updatedData = { email: 'updated@example.com' };
        const res = await request(app).put(`/userRegistrations/${registrationId}`).send(updatedData);
        expect(res.statusCode).to.equal(200);
        expect(res.body.email).to.equal(updatedData.email);
    });

    it('should delete a registration', async () => {
        const res = await request(app).delete(`/userRegistrations/${registrationId}`);
        expect(res.statusCode).to.equal(200);
        expect(res.body.registration_id).to.equal(registrationId);
    });

    it('should get all registrations', async () => {
        const res = await request(app).get('/userRegistrations');
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
    });
});
