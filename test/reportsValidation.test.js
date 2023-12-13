const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;
const request = require('supertest');
const app = require('../app');
const { vthreadsValidationSchema } = require('../validations/checkVthreads');

describe('Reports CRUD Operations', () => {
  let reportId;

  // Test for POST request to create a new report
  it('should create a new report', async () => {
    const newReport = {
      reported_by_user_id: 1,
      reported_user_id: 2,
      content: 'Report content here',
      report_date: new Date().toISOString()
    };

    const res = await request(app)
      .post('/reports')
      .send(newReport);

    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
    reportId = res.body.id;
  });

  // Test for GET request to retrieve a report by ID
  it('should get a report by ID', async () => {
    const res = await request(app).get(`/reports/${reportId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(reportId);
  });

  // Test for PUT request to update a report
  it('should update a report', async () => {
    const updatedReport = {
      content: 'Updated report content'
    };

    const res = await request(app)
      .put(`/reports/${reportId}`)
      .send(updatedReport);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(reportId);
  });

  // Test for DELETE request to delete a report
  it('should delete a report', async () => {
    const res = await request(app).delete(`/reports/${reportId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(reportId);
  });

  // Test for GET request to retrieve all reports
  it('should get all reports', async () => {
    const res = await request(app).get('/reports');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });
});
