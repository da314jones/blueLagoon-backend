const request = require('supertest');
const app = require('../app'); // Adjust the path as needed
const { expect } = require('chai');
const { userValidationSchema } = require('../src/validations/userValidation.js'); // Joi validation schema for users

describe('Users API', () => {
    let userId;

    // Test for creating a new user
    it('should create a new user', async () => {
        const newUser = {
            email: 'test@example.com',
            hashed_password: 'hashedpassword123',
            date_of_birth: '1990-01-01',
            // ... other required fields
        };

        const res = await request(app)
            .post('/users')
            .send(newUser);

        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        const validation = userValidationSchema.validate(res.body);
        expect(validation.error).to.be.undefined;

        userId = res.body.id; // Store the user ID for later tests
    });

    // Test for retrieving a specific user
    it('should retrieve a specific user by ID', async () => {
        const res = await request(app)
            .get(`/users/${userId}`);

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.equal(userId);
    });

    // Test for updating a user
    it('should update a user', async () => {
        const updatedUserData = {
            email: 'updated@example.com',
            // ... other fields to update
        };

        const res = await request(app)
            .put(`/users/${userId}`)
            .send(updatedUserData);

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.email).to.equal(updatedUserData.email);
    });

    // Test for deleting a user
    it('should delete a user', async () => {
        const res = await request(app)
            .delete(`/users/${userId}`);

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.equal(userId);
    });

    // Test for retrieving all users
    it('should retrieve all users', async () => {
        const res = await request(app)
            .get('/users');

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
        res.body.forEach(user => {
            const validation = userValidationSchema.validate(user);
            expect(validation.error).to.be.undefined;
        });
    });
});
