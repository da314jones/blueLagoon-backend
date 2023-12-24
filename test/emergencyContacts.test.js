const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;
const request = require('supertest');
// const app = require('../app'); // Replace with the path to your Express app

describe('Emergency Contacts CRUD Operations', () => {
  let contactId;

  // Test for POST request to create a new emergency contact
  it('should create a new emergency contact', async () => {
    const newContact = {
      user_id: 1, // Assuming a user_id is required
      name: 'John Doe',
      contact_info: '1234567890',
      description: 'Test Emergency Contact',
      location: 'Test City'
    };

    const res = await request(app)
      .post('/emergencycontacts')
      .send(newContact);

    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
    contactId = res.body.id; // Store the created contact ID for later tests
  });

  // Test for GET request to retrieve an emergency contact by ID
  it('should get an emergency contact by ID', async () => {
    const res = await request(app).get(`/emergencycontacts/${contactId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(contactId);
  });

  // Test for PUT request to update an emergency contact
  it('should update an emergency contact', async () => {
    const updatedContact = {
      name: 'Jane Doe',
      contact_info: '0987654321',
      description: 'Updated Emergency Contact',
      location: 'Updated City'
    };

    const res = await request(app)
      .put(`/emergencycontacts/${contactId}`)
      .send(updatedContact);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(contactId);
  });

  // Test for DELETE request to delete an emergency contact
  it('should delete an emergency contact', async () => {
    const res = await request(app).delete(`/emergencycontacts/${contactId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(contactId);
  });

  // Test for GET request to retrieve all emergency contacts
  it('should get all emergency contacts', async () => {
    const res = await request(app).get('/emergencycontacts');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });
});
