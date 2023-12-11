const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const should = chai.should();
const request = require('supertest');
const app = require('../app');
const { expect } = require('chai');
const { vchatValidationSchema } = require('../src/validations/checkVchat');


describe('VChat API Tests', () => {
    let vchatId;

    // should create a new VChat
it('should create a new VChat', (done) => {
  chai
      .request(app)
      .post('/vchats')
      .send({
          user_id: 1, // Include user_id in the request body
          video_url: 'https://example.com/video',
          schedule_time: '2023-01-01 09:00:00',
          duration: 30,
          archive_link: 'https://example.com/archive',
          start_time: '2023-01-01 09:00:00',
          end_time: '2023-01-01 09:30:00',
          archive_url: 'https://example.com/archive-url',
      })
      .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('user_id'); // Make sure it has user_id property
          done();
      });
})

    it('should get a VChat by ID', async () => {
        const res = await request(app).get(`/vchats/${vchatId}`);
        expect(res.statusCode).to.equal(200);
        expect(res.body.id).to.equal(vchatId);
    });

// should update a VChat
it('should update a VChat', (done) => {
  const vchatId = 10; // Replace with the actual VChat ID to update
  chai
      .request(app)
      .put(`/vchats/${vchatId}`)
      .send({
          user_id: 2,
          video_url: 'https://example.com/video',
          schedule_time: '2023-01-01 09:00:00',
          duration: 30,
          archive_link: 'https://example.com/archive',
          start_time: '2023-01-01 09:00:00',
          end_time: '2023-01-01 09:30:00',
          archive_url: 'https://example.com/archive-url',
      })
      .end((err, res) => {
          res.should.have.status(200); // Expect 200 status code for successful update
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          done();
      });
});


    it('should delete a VChat', async () => {
        const res = await request(app).delete(`/vchats/${vchatId}`);
        expect(res.statusCode).to.equal(200);
        expect(res.body.id).to.equal(vchatId);
    });

    // Corrected Test 3
it('should get all VChats', async () => {
  const res = await request(app).get('/vchats');
  expect(res.statusCode).to.equal(200);
  expect(res.body.payload).to.be.an('array'); // Access payload property
});
});

module.exports = { vchatValidationSchema };
