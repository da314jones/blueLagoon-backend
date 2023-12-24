const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;
const request = require('supertest');
// const app = require('../app'); // Replace with the path to your Express app

describe('Groups CRUD Operations', () => {
  let groupId;

  // Test for POST request to create a new group
  it('should create a new group', async () => {
    const newGroup = {
      name: 'Sample Group',
      description: 'This is a test group',
      creation_date: '2023-01-01'
    };

    const res = await request(app)
      .post('/groups')
      .send(newGroup);

    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
    groupId = res.body.id; // Store the created group ID for later tests
  });

  // Test for GET request to retrieve a group by ID
  it('should get a group by ID', async () => {
    const res = await request(app).get(`/groups/${groupId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(groupId);
  });

  // Test for PUT request to update a group
  it('should update a group', async () => {
    const updatedGroup = {
      name: 'Updated Group',
      description: 'Updated description',
      creation_date: '2023-02-01'
    };

    const res = await request(app)
      .put(`/groups/${groupId}`)
      .send(updatedGroup);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(groupId);
  });

  // Test for DELETE request to delete a group
  it('should delete a group', async () => {
    const res = await request(app).delete(`/groups/${groupId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(groupId);
  });

  // Test for GET request to retrieve all groups
  it('should get all groups', async () => {
    const res = await request(app).get('/groups');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });
});
