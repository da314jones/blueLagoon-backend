const request = require('supertest');
const app = require('../app'); // Replace with your Express app
const { expect } = require('chai');

describe('User Security API Tests', () => {
    let securityId;

    // Test for creating a new user security entry
    it('should create a new user security entry', async () => {
        const newUserSecurity = {
            user_id: 1, // Replace with a valid user_id
            email_verified: false,
            phone_verified: false,
            phone_verification_code: '123456',
            two_factor_enabled: false
        };

        const res = await request(app)
            .post('/userSecurity')
            .send(newUserSecurity);

        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        securityId = res.body.security_id;
    });

    // Test for retrieving a specific user security entry
    it('should retrieve a specific user security entry by ID', async () => {
        const res = await request(app)
            .get(`/userSecurity/${securityId}`);

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.security_id).to.equal(securityId);
    });

    // Test for updating a user security entry
    it('should update a user security entry', async () => {
        const updatedData = {
            email_verified: true,
            phone_verified: true
        };

        const res = await request(app)
            .put(`/userSecurity/${securityId}`)
            .send(updatedData);

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.email_verified).to.be.true;
        expect(res.body.phone_verified).to.be.true;
    });

    // Test for deleting a user security entry
    it('should delete a user security entry', async () => {
        const res = await request(app)
            .delete(`/userSecurity/${securityId}`);

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.security_id).to.equal(securityId);
    });

    // Test for retrieving all user security entries
    it('should retrieve all user security entries', async () => {
        const res = await request(app)
            .get('/userSecurity');

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
    });
});
