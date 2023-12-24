const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;
const request = require('supertest');
const app = require('../app'); // replace with the path to your Express app

describe('Message CRUD API Tests', () => {
  let messageId;

  // Test for POST request to create a new message
  it('should create a new message', async () => {
    const newMessage = {
      session_id: 1,
      user_id: 1,
      message: 'Hello, world!',
      timestamp: new Date()
    };

    const res = await request(app)
      .post('/messages')
      .send(newMessage);

    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
    messageId = res.body.id; // Store the created message ID for later tests
  });

  // Test for GET request to retrieve a message by ID
  it('should get a message by ID', async () => {
    const res = await request(app).get(`/messages/${messageId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(messageId);
  });

  // Test for PUT request to update a message
  it('should update a message', async () => {
    const updatedMessage = {
      session_id: 2,
      user_id: 2,
      message: 'Updated message',
      timestamp: new Date()
    };

    const res = await request(app)
      .put(`/messages/${messageId}`)
      .send(updatedMessage);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(messageId);
  });

  // Test for DELETE request to delete a message
  it('should delete a message', async () => {
    const res = await request(app).delete(`/messages/${messageId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(messageId);
  });

  // Test for GET request to retrieve all messages
  it('should get all messages', async () => {
    const res = await request(app).get('/messages');
    expect(res).to.have.status(200);
    expect(res.body.payload).to.be.an('array');
  });
});
