const request = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('Profiles API Tests', () => {
    let profileId;

    it('should create a new profile', async () => {
        const profileData = {
            user_id: 1, // Replace with actual user ID
            name: 'John Doe',
            gender: 'Male',
            // ... other fields
        };
        const res = await request(app).post('/profiles').send(profileData);
        expect(res.statusCode).to.equal(201);
        profileId = res.body.profile_id;
        expect(res.body).to.include(profileData);
    });

    it('should get a profile by ID', async () => {
        const res = await request(app).get(`/profiles/${profileId}`);
        expect(res.statusCode).to.equal(200);
        expect(res.body.profile_id).to.equal(profileId);
    });

    it('should update a profile', async () => {
        const updatedData = { name: 'Jane Doe' };
        const res = await request(app).put(`/profiles/${profileId}`).send(updatedData);
        expect(res.statusCode).to.equal(200);
        expect(res.body.name).to.equal(updatedData.name);
    });

    it('should delete a profile', async () => {
        const res = await request(app).delete(`/profiles/${profileId}`);
        expect(res.statusCode).to.equal(200);
        expect(res.body.profile_id).to.equal(profileId);
    });

    it('should get all profiles', async () => {
        const res = await request(app).get('/profiles');
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
    });
});
