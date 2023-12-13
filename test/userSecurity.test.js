const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;
const request = require('supertest');
const app = require('../app');
const { vthreadsValidationSchema } = require('../validations/checkVthreads');

describe('User Security CRUD Operations', () => {
    let securityId;
  
    // Test for POST request to create a new user security entry
    it('should create a new user security entry', async () => {
      const newUserSecurity = {
        user_id: 1,
        email_verified: true,
        phone_verified: false,
        two_factor_enabled: true
      };
  
      const res = await request(app)
        .post('/usersecurity')
        .send(newUserSecurity);
  
      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      securityId = res.body.id;
    });
  
    // Test for GET request to retrieve a user security entry by ID
    it('should get a user security entry by ID', async () => {
      const res = await request(app).get(`/usersecurity/${securityId}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.id).to.equal(securityId);
    });
  
    // Test for PUT request to update a user security entry
    it('should update a user security entry', async () => {
      const updatedUserSecurity = {
        email_verified: false,
        two_factor_enabled: false
      };
  
      const res = await request(app)
        .put(`/usersecurity/${securityId}`)
        .send(updatedUserSecurity);
  
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.id).to.equal(securityId);
    });
  
    // Test for DELETE request to delete a user security entry
    it('should delete a user security entry', async () => {
      const res = await request(app).delete(`/usersecurity/${securityId}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.id).to.equal(securityId);
    });
  
    // Test for GET request to retrieve all user security entries
    it('should get all user security entries', async () => {
      const res = await request(app).get('/usersecurity');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
    });
  });
  