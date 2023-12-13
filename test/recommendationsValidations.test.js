const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;
const request = require('supertest');
const app = require('../app');
const { vthreadsValidationSchema } = require('../validations/checkVthreads');

describe('Recommendations CRUD Operations', () => {
  let recommendationId;

  // Test for POST request to create a new recommendation
  it('should create a new recommendation', async () => {
    const newRecommendation = {
      user_id: 1,
      title: 'New Recommendation',
      description: 'This is a test recommendation.',
      link: 'https://example.com/recommendation',
      recommended_on: '2023-01-01'
    };

    const res = await request(app)
      .post('/recommendations')
      .send(newRecommendation);

    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
    recommendationId = res.body.id;
  });

  // Test for GET request to retrieve a recommendation by ID
  it('should get a recommendation by ID', async () => {
    const res = await request(app).get(`/recommendations/${recommendationId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(recommendationId);
  });

  // Test for PUT request to update a recommendation
  it('should update a recommendation', async () => {
    const updatedRecommendation = {
      title: 'Updated Recommendation',
      description: 'Updated description for recommendation.'
    };

    const res = await request(app)
      .put(`/recommendations/${recommendationId}`)
      .send(updatedRecommendation);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(recommendationId);
  });

  // Test for DELETE request to delete a recommendation
  it('should delete a recommendation', async () => {
    const res = await request(app).delete(`/recommendations/${recommendationId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(recommendationId);
  });

  // Test for GET request to retrieve all recommendations
  it('should get all recommendations', async () => {
    const res = await request(app).get('/recommendations');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });
});
