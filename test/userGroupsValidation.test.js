const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;
const request = require('supertest');
const app = require('../app');
const { vthreadsValidationSchema } = require('../validations/checkVthreads');

describe('User Groups CRUD Operations', () => {
  let userGroupId;

  // Test for POST request to create a new user group
  it('should create a new user group', async () => {
    const newUserGroup = {
      user_id: 1,
      group_id: 1,
      join_date: new Date().toISOString()
    };

    const res = await request(app)
      .post('/usergroups')
      .send(newUserGroup);

    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
    userGroupId = res.body.id;
  });

  // Test for GET request to retrieve a user group by ID
  it('should get a user group by ID', async () => {
    const res = await request(app).get(`/usergroups/${userGroupId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(userGroupId);
  });

  // Test for DELETE request to delete a user group
  it('should delete a user group', async () => {
    const res = await request(app).delete(`/usergroups/${userGroupId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(userGroupId);
  });

  // Test for GET request to retrieve all user groups
  it('should get all user groups', async () => {
    const res = await request(app).get('/usergroups');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });
});
