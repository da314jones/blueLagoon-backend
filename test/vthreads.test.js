const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;
const request = require('supertest');
const app = require('../app');
const { vthreadsValidationSchema } = require('../validations/checkVthreads');

describe('Vthreads API Tests', () => {
  let vthreadId;

  // Test for POST request to create a new VThread
  it('should create a new VThread', async () => {
    const newVThread = {
      user_id: 1,
      title: 'Sample Video Thread',
      video_url: 'https://example.com/video.mp4',
      category: 'Education',
      creation_date: '2023-01-01'
    };

    const res = await request(app)
      .post('/vthreads')
      .send(newVThread);

    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
    vthreadId = res.body.id; // Store the created VThread ID for later tests
  });

  // Test for GET request to retrieve a VThread by ID
  it('should get a VThread by ID', async () => {
    const res = await request(app).get(`/vthreads/${vthreadId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(vthreadId);
  });

  // Test for PUT request to update a VThread
  it('should update a VThread', async () => {
    const updatedVThread = {
      user_id: 2,
      title: 'Updated Video Thread',
      video_url: 'https://example.com/updated-video.mp4',
      category: 'Updated Category',
      creation_date: '2023-01-02'
    };

    const res = await request(app)
      .put(`/vthreads/${vthreadId}`)
      .send(updatedVThread);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(vthreadId);
  });

  // Test for DELETE request to delete a VThread
  it('should delete a VThread', async () => {
    const res = await request(app).delete(`/vthreads/${vthreadId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(vthreadId);
  });

  // Test for GET request to retrieve all VThreads
  it('should get all VThreads', async () => {
    const res = await request(app).get('/vthreads');
    expect(res).to.have.status(200);
    expect(res.body.payload).to.be.an('array');
  });
});

module.exports = { vthreadsValidationSchema };
