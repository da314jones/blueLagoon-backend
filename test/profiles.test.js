const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;
const request = require('supertest');
const app = require('../app');
const { profilesValidationSchema } = require('../validations/checkProfiles');

describe('Profiles CRUD Operations', () => {
    let profileId;

    it('should create a new profile', async () => {
        const newProfile = {
            user_id: 8,
            name: 'Test User',
            gender: 'Non-binary',
            profile_picture_url: 'https://example.com/profile.jpg',
            bio: 'Test bio',
            location: 'Test City'
        };

        const res = await request(app)
            .post('/profiles')
            .send(newProfile);

        expect(res).to.have.status(201);
        profileId = res.body.profile_id;
        expect(res.body).to.include(newProfile);
    });

    it('should get a profile by ID', async () => {
        const res = await request(app).get(`/profiles/${profileId}`);
        expect(res).to.have.status(200);
        expect(res.body.profile_id).to.equal(profileId);
    });

    it('should update a profile', async () => {
        const updatedProfile = {
            name: 'Updated User',
            bio: 'Updated bio'
        };

        const res = await request(app)
            .put(`/profiles/${profileId}`)
            .send(updatedProfile);

        expect(res).to.have.status(200);
        expect(res.body.name).to.equal(updatedProfile.name);
    });

    it('should delete a profile', async () => {
        const res = await request(app).delete(`/profiles/${profileId}`);
        expect(res).to.have.status(200);
    });

    it('should get all profiles', async () => {
        const res = await request(app).get('/profiles');
        expect(res).to.have.status(200);
        expect(res.body.payload).to.be.an('array');
    });
});
