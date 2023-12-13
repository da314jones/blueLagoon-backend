const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;
const request = require('supertest');
const app = require('../app');
const { vthreadsValidationSchema } = require('../validations/checkVthreads');

describe('Professional VChats CRUD Operations', () => {
  let vchatId;

  // Test for POST request to create a new professional vchat
  it('should create a new professional vchat', async () => {
    const newVChat = {
      topic: 'New VChat Topic',
      creator: 'John Doe',
      video_url: 'https://example.com/vchat.mp4',
      date: '2023-01-01',
      time: '12:00',
      is_live: true,
      archived: false
    };

    const res = await request(app)
      .post('/professionalvchats')
      .send(newVChat);

    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
    vchatId = res.body.id;
  });

  // Test for GET request to retrieve a professional vchat by ID
  it('should get a professional vchat by ID', async () => {
    const res = await request(app).get(`/professionalvchats/${vchatId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(vchatId);
  });

  // Test for PUT request to update a professional vchat
  it('should update a professional vchat', async () => {
    const updatedVChat = {
      topic: 'Updated VChat Topic',
      is_live: false
    };

    const res = await request(app)
      .put(`/professionalvchats/${vchatId}`)
      .send(updatedVChat);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(vchatId);
  });

  // Test for DELETE request to delete a professional vchat
  it('should delete a professional vchat', async () => {
    const res = await request(app).delete(`/professionalvchats/${vchatId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(vchatId);
  });

  // Test for GET request to retrieve all professional vchats
  it('should get all professional vchats', async () => {
    const res = await request(app).get('/professionalvchats');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });
});
