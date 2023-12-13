const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;
const request = require('supertest');
const app = require('../app');
const { vthreadsValidationSchema } = require('../validations/checkVthreads');

describe('Resources CRUD Operations', () => {
  let resourceId;

  // Test for POST request to create a new resource
  it('should create a new resource', async () => {
    const newResource = {
      title: 'Resource Title',
      type: 'Type here',
      link: 'https://example.com/resource',
      location_based: true,
      location: 'Resource location'
    };

    const res = await request(app)
      .post('/resources')
      .send(newResource);

    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
    resourceId = res.body.id;
  });

  // Test for GET request to retrieve a resource by ID
  it('should get a resource by ID', async () => {
    const res = await request(app).get(`/resources/${resourceId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(resourceId);
  });

  // Test for PUT request to update a resource
  it('should update a resource', async () => {
    const updatedResource = {
      title: 'Updated Resource Title'
    };

    const res = await request(app)
      .put(`/resources/${resourceId}`)
      .send(updatedResource);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(resourceId);
  });

  // Test for DELETE request to delete a resource
  it('should delete a resource', async () => {
    const res = await request(app).delete(`/resources/${resourceId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(resourceId);
  });

  // Test for GET request to retrieve all resources
  it('should get all resources', async () => {
    const res = await request(app).get('/resources');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });
});
