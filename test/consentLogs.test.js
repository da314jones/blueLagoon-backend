const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;
const request = require('supertest');
const app = require('../app.js');

describe('Consent Logs CRUD Operations', () => {
  let consentLogId;

  // Test for POST request to create a new consent log
  it('should create a new consent log', async () => {
    const newConsentLog = {
      user_id: 1,
      document_id: 2,
      consent_date: new Date().toISOString(),
      version: 1
    };

    const res = await request(app)
      .post('/consentLogs')
      .send(newConsentLog);

    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
    consentLogId = res.body.id;
  });

  // Test for GET request to retrieve a consent log by ID
  it('should get a consent log by ID', async () => {
    const res = await request(app).get(`/consentLogs/${consentLogId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(consentLogId);
  });

  // Test for PUT request to update a consent log
  it('should update a consent log', async () => {
    const updatedConsentLog = {
      version: 2
    };

    const res = await request(app)
      .put(`/consentLogs/${consentLogId}`)
      .send(updatedConsentLog);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.version).to.equal(updatedConsentLog.version);
  });

  // Test for DELETE request to delete a consent log
  it('should delete a consent log', async () => {
    const res = await request(app).delete(`/consentLogs/${consentLogId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(consentLogId);
  });

  // Test for GET request to retrieve all user consent logs
  it('should get all consent logs', async () => {
    const res = await request(app).get('/consentLogs');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });
});
