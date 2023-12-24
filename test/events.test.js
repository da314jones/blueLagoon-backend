const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;
const request = require('supertest');
// const app = require('../app'); // Replace with the path to your Express app

describe('Events CRUD Operations', () => {
  let eventId;

  // Test for POST request to create a new event
  it('should create a new event', async () => {
    const newEvent = {
      title: 'Sample Event',
      description: 'This is a test event',
      location: 'Test location',
      date: '2023-01-01',
      time: '12:00',
      capacity: 100,
      organizer: 'Test Organizer',
      category: 'Education',
      contact_email: 'test@example.com',
      sign_up_link: 'https://example.com/event'
    };

    const res = await request(app)
      .post('/events')
      .send(newEvent);

    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
    eventId = res.body.id; // Store the created event ID for later tests
  });

  // Test for GET request to retrieve an event by ID
  it('should get an event by ID', async () => {
    const res = await request(app).get(`/events/${eventId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(eventId);
  });

  // Test for PUT request to update an event
  it('should update an event', async () => {
    const updatedEvent = {
      title: 'Updated Event',
      description: 'Updated description',
      location: 'Updated location',
      date: '2023-02-01',
      time: '15:00',
      capacity: 150,
      organizer: 'Updated Organizer',
      category: 'Technology',
      contact_email: 'update@example.com',
      sign_up_link: 'https://example.com/updated-event'
    };

    const res = await request(app)
      .put(`/events/${eventId}`)
      .send(updatedEvent);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(eventId);
  });

  // Test for DELETE request to delete an event
  it('should delete an event', async () => {
    const res = await request(app).delete(`/events/${eventId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(eventId);
  });

  // Test for GET request to retrieve all events
  it('should get all events', async () => {
    const res = await request(app).get('/events');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });
});
