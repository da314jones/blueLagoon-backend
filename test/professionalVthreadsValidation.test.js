const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;
const request = require('supertest');
const app = require('../app');
const { vthreadsValidationSchema } = require('../validations/checkVthreads');

describe('Professional VThreads CRUD Operations', () => {
  let vthreadId;

  // Test for POST request to create a new professional vthread
  it('should create a new professional vthread', async () => {
    const newVThread = {
      topic: 'New VThread Topic',
      creator: 'Jane Doe',
      video_url: 'https://example.com/vthread.mp4',
      date: '2023-01-01',
      time: '15:00',
      is_live: true,
      archived: false
    };

    const res = await request(app)
      .post('/professionalvthreads')
      .send(newVThread);

    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
    vthreadId = res.body.id;
  });

  // Test for GET request to retrieve a professional vthread by ID
  it('should get a professional vthread by ID', async () => {
    const res = await request(app).get(`/professionalvthreads/${vthreadId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(vthreadId);
  });

  // Test for PUT request to update a professional vthread
  it('should update a professional vthread', async () => {
    const updatedVThread = {
      topic: 'Updated VThread Topic',
      is_live: false
    };

    const res = await request(app)
      .put(`/professionalvthreads/${vthreadId}`)
      .send(updatedVThread);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(vthreadId);
  });

  // Test for DELETE request to delete a professional vthread
  it('should delete a professional vthread', async () => {
    const res = await request(app).delete(`/professionalvthreads/${vthreadId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(vthreadId);
  });

  // Test for GET request to retrieve all professional vthreads
  it('should get all professional vthreads', async () => {
    const res = await request(app).get('/professionalvthreads');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });
});
