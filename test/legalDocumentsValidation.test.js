const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;
const request = require('supertest');
const app = require('../app'); // Replace with the path to your Express app

describe('Legal Documents CRUD Operations', () => {
  let documentId;

  // Test for POST request to create a new legal document
  it('should create a new legal document', async () => {
    const newDocument = {
      title: 'Privacy Policy',
      document_type: 'Policy',
      content: 'This is a test privacy policy content.',
      effective_date: '2023-01-01'
    };

    const res = await request(app)
      .post('/legaldocuments')
      .send(newDocument);

    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
    documentId = res.body.id; // Store the created document ID for later tests
  });

  // Test for GET request to retrieve a legal document by ID
  it('should get a legal document by ID', async () => {
    const res = await request(app).get(`/legaldocuments/${documentId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(documentId);
  });

  // Test for PUT request to update a legal document
  it('should update a legal document', async () => {
    const updatedDocument = {
      title: 'Updated Privacy Policy',
      document_type: 'Policy',
      content: 'This is updated content for the privacy policy.',
      effective_date: '2023-02-01'
    };

    const res = await request(app)
      .put(`/legaldocuments/${documentId}`)
      .send(updatedDocument);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(documentId);
  });

  // Test for DELETE request to delete a legal document
  it('should delete a legal document', async () => {
    const res = await request(app).delete(`/legaldocuments/${documentId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(documentId);
  });

  // Test for GET request to retrieve all legal documents
  it('should get all legal documents', async () => {
    const res = await request(app).get('/legaldocuments');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });
});
