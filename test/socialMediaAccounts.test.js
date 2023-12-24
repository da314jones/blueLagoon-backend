const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;
const request = require('supertest');
const app = require('../app.js');
const { socialMediaAccountsValidationSchema } = require('../validations/checkSocialMediaAccounts.js');

describe('Social Media Accounts CRUD Operations', () => {
  let accountId;

  // Test for POST request to create a new social media account
  it('should create a new social media account', async () => {
    const newAccount = {
      user_id: 1,
      social_media_platform: 'Facebook',
      social_media_id: 'fb123',
      profile_url: 'https://facebook.com/user',
      connected_on: new Date().toISOString()
    };

    const res = await request(app)
      .post('/socialmediaaccounts')
      .send(newAccount);

    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
    accountId = res.body.id;
  });

  // Test for GET request to retrieve a social media account by ID
  it('should get a social media account by ID', async () => {
    const res = await request(app).get(`/socialmediaaccounts/${accountId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(accountId);
  });

  // Test for PUT request to update a social media account
  it('should update a social media account', async () => {
    const updatedAccount = {
      social_media_platform: 'Updated Facebook'
    };

    const res = await request(app)
      .put(`/socialmediaaccounts/${accountId}`)
      .send(updatedAccount);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(accountId);
  });

  // Test for DELETE request to delete a social media account
  it('should delete a social media account', async () => {
    const res = await request(app).delete(`/socialmediaaccounts/${accountId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(accountId);
  });

  // Test for GET request to retrieve all social media accounts
  it('should get all social media accounts', async () => {
    const res = await request(app).get('/socialmediaaccounts');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });
});
