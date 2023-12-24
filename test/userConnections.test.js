const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;
const request = require('supertest');
const app = require('../app.js');
const { userConnectionsValidationSchema } = require('../validations/checkUserConnections.js');

describe('User Connections CRUD Operations', () => {
  let connectionId;

  // Test for POST request to create a new user connection
  it('should create a new user connection', async () => {
    const newConnection = {
      user1_id: 1,
      user2_id: 2,
      connection_on: new Date().toISOString()
    };

    const res = await request(app)
      .post('/userconnections')
      .send(newConnection);

    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
    connectionId = res.body.id;
  });

  // Test for GET request to retrieve a user connection by ID
  it('should get a user connection by ID', async () => {
    const res = await request(app).get(`/userconnections/${connectionId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(connectionId);
  });

  // Test for DELETE request to delete a user connection
  it('should delete a user connection', async () => {
    const res = await request(app).delete(`/userconnections/${connectionId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(connectionId);
  });

  // Test for GET request to retrieve all user connections
  it('should get all user connections', async () => {
    const res = await request(app).get('/userconnections');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });
});
