const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;
const request = require('supertest');
const app = require('../app');
const { vthreadsValidationSchema } = require('../validations/checkVthreads');

describe('Reviews CRUD Operations', () => {
  let reviewId;

  // Test for POST request to create a new review
  it('should create a new review', async () => {
    const newReview = {
      user_id: 1,
      event_id: 1,
      rating: 5,
      comment: 'Great event!',
      created_at: new Date().toISOString()
    };

    const res = await request(app)
      .post('/reviews')
      .send(newReview);

    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
    reviewId = res.body.id;
  });

  // Test for GET request to retrieve a review by ID
  it('should get a review by ID', async () => {
    const res = await request(app).get(`/reviews/${reviewId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(reviewId);
  });

  // Test for PUT request to update a review
  it('should update a review', async () => {
    const updatedReview = {
      rating: 4,
      comment: 'Updated review comment.'
    };

    const res = await request(app)
      .put(`/reviews/${reviewId}`)
      .send(updatedReview);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(reviewId);
  });

  // Test for DELETE request to delete a review
  it('should delete a review', async () => {
    const res = await request(app).delete(`/reviews/${reviewId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(reviewId);
  });

  // Test for GET request to retrieve all reviews
  it('should get all reviews', async () => {
    const res = await request(app).get('/reviews');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });
});
