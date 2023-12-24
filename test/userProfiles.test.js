const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;
const request = require('supertest');
const app = require('../app.js');
const { profileValidationSchema } = require('../validations/checkUserProfile.js');

describe('User Profiles CRUD Operations', () => {
    let profileId;

    it('should create a new user profile', async () => {
        const newUserProfile = {
            user_id: 6, // Assuming this ID doesn't exist in your seed data
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
        expect(res.body).to.include(newUserProfile);
    });
    

    it('should get a user profile by ID', async () => {
        const res = await request(app).get(`/profiles/1`); // Assuming ID 1 exists
        expect(res).to.have.status(200);
        expect(res.body.name).to.equal('User One');
    });
    

    it('should update a user profile', async () => {
        const updatedUserProfile = {
            name: 'Updated User',
            bio: 'Updated bio'
            // Only updating name and bio
        };
    
        const res = await request(app)
            .put(`/profiles/1`) // Assuming ID 1 exists
            .send(updatedUserProfile);
    
        expect(res).to.have.status(200);
        expect(res.body.name).to.equal(updatedUserProfile.name);
    });
    

    it('should delete a user profile', async () => {
        const res = await chai.request(app).delete(`/profiles/${profileId}`);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.profile_id).to.equal(profileId);
    });

    it('should get all user profiles', async () => {
        const res = await chai.request(app).get('/profiles');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object').that.has.property('payload').which.is.an('array');
    });
});
