const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;
const request = require('supertest');
const app = require('../app');
const { vthreadsValidationSchema } = require('../validations/checkVthreads');

describe('User Profiles CRUD Operations', () => {
    let profileId;
  
    // Test for POST request to create a new user profile
    it('should create a new user profile', async () => {
      const newUserProfile = {
        user_id: 1,
        name: 'John Doe',
        gender: 'Male',
        profile_picture_url: 'https://example.com/profile.jpg',
        bio: 'Bio goes here',
        location: 'City, Country'
      };
  
      const res = await request(app)
        .post('/userprofiles')
        .send(newUserProfile);
  
      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      profileId = res.body.id;
    });
  
    // Test for GET request to retrieve a user profile by ID
    it('should get a user profile by ID', async () => {
      const res = await request(app).get(`/userprofiles/${profileId}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.id).to.equal(profileId);
    });
  
    // Test for PUT request to update a user profile
    it('should update a user profile', async () => {
      const updatedUserProfile = {
        name: 'Jane Doe',
        bio: 'Updated bio goes here'
      };
  
      const res = await request(app)
        .put(`/userprofiles/${profileId}`)
        .send(updatedUserProfile);
  
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.id).to.equal(profileId);
    });
  
    // Test for DELETE request to delete a user profile
    it('should delete a user profile', async () => {
      const res = await request(app).delete(`/userprofiles/${profileId}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.id).to.equal(profileId);
    });
  
    // Test for GET request to retrieve all user profiles
    it('should get all user profiles', async () => {
      const res = await request(app).get('/userprofiles');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
    });
  });
  