const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;
const request = require('supertest');
const app = require('../app.js');
const { usersValidationSchema } = require('../validations/checkUsers.js');

describe('Users CRUD Operations', () => {
    let userId;
  
    // Test for POST request to create a new user
    it('should create a new user', async () => {
      const newUser = {
        username: 'newuser',
        email: 'newuser@example.com',
        password_hash: 'hashedpassword',
        date_of_birth: '1990-01-01',
        is_age_verified: false,
        account_status: 'active',
        phone_number: '1234567890',
        profile_pic: 'https://example.com/profile.jpg',
        interests: 'Coding, Tech',
        challenges: 'Learning new technologies',
        experiences: '5 years in development',
        locations: 'City, Country',
        role: 'User'
      };
  
      const res = await request(app)
        .post('/users')
        .send(newUser);
  
      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      userId = res.body.user_id;
    });
  
    // Test for GET request to retrieve a user by ID
    it('should get a user by ID', async () => {
      const res = await request(app).get(`/users/${userId}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.user_id).to.equal(userId);
    });
  
    // Test for PUT request to update a user
    it('should update a user', async () => {
      const updatedUser = {
        email: 'updateduser@example.com',
        phone_number: '0987654321',
        profile_pic: 'https://example.com/newprofile.jpg'
      };
  
      const res = await request(app)
        .put(`/users/${userId}`)
        .send(updatedUser);
  
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.user_id).to.equal(userId);
    });
  
    // Test for DELETE request to delete a user
    it('should delete a user', async () => {
      const res = await request(app).delete(`/users/${userId}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.user_id).to.equal(userId);
    });
  
    // Test for GET request to retrieve all users
    it('should get all users', async () => {
      const res = await request(app).get('/users');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
    });
  });
  