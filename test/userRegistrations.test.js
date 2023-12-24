const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;
const request = require('supertest');
const app = require('../app.js');
const { registrationsValidationSchema } = require('../validations/checkUserRegisters.js');

describe('User Registrations CRUD Operations', () => {
    let registrationId;
  
    // Test for POST request to create a new user registration
    it('should create a new user registration', async () => {
      const newUserRegistration = {
        user_id: 1,
        email: 'john@example.com',
        registration_token: 'token123',
        token_expiration: new Date().toISOString(),
        agree_to_terms_of_service: true
      };
  
      const res = await request(app)
        .post('/useRegistrations')
        .send(newUserRegistration);
  
      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      registrationId = res.body.id;
    });
  
    // Test for GET request to retrieve a user registration by ID
    it('should get a user registration by ID', async () => {
      const res = await request(app).get(`/userRegistrations/${registrationId}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.id).to.equal(registrationId);
    });
  
    // Test for DELETE request to delete a user registration
    it('should delete a user registration', async () => {
      const res = await request(app).delete(`/userRegistrations/${registrationId}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.id).to.equal(registrationId);
    });
  
    // Test for GET request to retrieve all user registrations
    it('should get all user registrations', async () => {
      const res = await request(app).get('/userRegistrations');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
    });
  });
  