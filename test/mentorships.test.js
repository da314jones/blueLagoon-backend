const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;
const request = require('supertest');
// const app = require('../app'); // Replace with your Express app path

describe('Mentorships CRUD Operations', () => {
  let mentorshipId;

  // Test for POST request to create a new mentorship
  it('should create a new mentorship', async () => {
    const newMentorship = {
      mentor_id: 1,
      mentee_id: 2,
      start_date: '2023-01-01',
      end_date: '2023-12-31',
      status: 'active',
      notes: 'Initial mentorship notes'
    };

    const res = await request(app)
      .post('/mentorships')
      .send(newMentorship);

    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
    mentorshipId = res.body.id;
  });

  // Test for GET request to retrieve a mentorship by ID
  it('should get a mentorship by ID', async () => {
    const res = await request(app).get(`/mentorships/${mentorshipId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(mentorshipId);
  });

  // Test for PUT request to update a mentorship
  it('should update a mentorship', async () => {
    const updatedMentorship = {
      status: 'completed',
      notes: 'Updated mentorship notes'
    };

    const res = await request(app)
      .put(`/mentorships/${mentorshipId}`)
      .send(updatedMentorship);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(mentorshipId);
  });

  // Test for DELETE request to delete a mentorship
  it('should delete a mentorship', async () => {
    const res = await request(app).delete(`/mentorships/${mentorshipId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(mentorshipId);
  });

  // Test for GET request to retrieve all mentorships
  it('should get all mentorships', async () => {
    const res = await request(app).get('/mentorships');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });
});
