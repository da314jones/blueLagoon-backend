const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;
const request = require('supertest');
const app = require('../app');
const { vthreadsValidationSchema } = require('../validations/checkVthreads');

describe('Notifications CRUD Operations', () => {
  let notificationId;

  // Test for POST request to create a new notification
  it('should create a new notification', async () => {
    const newNotification = {
      user_id: 1,
      type: 'Alert',
      message: 'New notification message',
      date: '2023-01-01T12:00:00Z'
    };

    const res = await request(app)
      .post('/notifications')
      .send(newNotification);

    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
    notificationId = res.body.id;
  });

  // Test for GET request to retrieve a notification by ID
  it('should get a notification by ID', async () => {
    const res = await request(app).get(`/notifications/${notificationId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(notificationId);
  });

  // Test for PUT request to update a notification
  it('should update a notification', async () => {
    const updatedNotification = {
      message: 'Updated notification message'
    };

    const res = await request(app)
      .put(`/notifications/${notificationId}`)
      .send(updatedNotification);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(notificationId);
  });

  // Test for DELETE request to delete a notification
  it('should delete a notification', async () => {
    const res = await request(app).delete(`/notifications/${notificationId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(notificationId);
  });

  // Test for GET request to retrieve all notifications
  it('should get all notifications', async () => {
    const res = await request(app).get('/notifications');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });
});
