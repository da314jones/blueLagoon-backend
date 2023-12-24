const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = require('supertest');
const app = require('../app.js');

describe('User Profiles CRUD Operations', () => {
    let profileId;

    it('should create a new user profile', async () => {
        const newUserProfile = {
            user_id: 8, // Replace with a valid user ID from your users table
            name: 'New User',
            gender: 'Male',
            profile_picture_url: 'https://newexample.com/profile.jpg',
            bio: 'New bio',
            location: 'New City, Country'
        };

        const res = await request(app)
            .post('/profiles')
            .send(newUserProfile);

        expect(res).to.have.status(201);
        expect(res.body).to.include.keys('profile_id', 'user_id', 'name', 'gender', 'profile_picture_url', 'bio', 'location');
        profileId = res.body.profile_id; // Save profile ID for other tests
    });

    it('should get a user profile by ID', async () => {
        const res = await request(app).get(`/profiles/${profileId}`);
        expect(res).to.have.status(200);
        expect(res.body).to.include.keys('profile_id', 'user_id', 'name', 'gender', 'profile_picture_url', 'bio', 'location');
    });

    it('should update a user profile', async () => {
        const updatedUserProfile = {
            name: 'Updated User',
            bio: 'Updated bio'
        };

        const res = await request(app)
            .put(`/profiles/${profileId}`)
            .send(updatedUserProfile);

        expect(res).to.have.status(200);
        expect(res.body).to.include(updatedUserProfile);
    });

    it('should delete a user profile', async () => {
        const res = await request(app).delete(`/profiles/${profileId}`);
        expect(res).to.have.status(200);
        expect(res.body).to.include.keys('profile_id');
    });

    it('should get all user profiles', async () => {
        const res = await request(app).get('/profiles');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object').with.property('payload').which.is.an('array');
    });
});
