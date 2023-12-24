const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js'); // Adjust this path as necessary to import your Express app
const { securityValidationSchema } = require("../validations/checkSecurity.js")
chai.use(chaiHttp);
const { expect } = chai;

describe('User Security CRUD Operations', () => {
    let securityId;

    // Test for POST request to create a new user security entry
    it('should create a new security entry', (done) => {
        const newSecurity = {
            user_id: 1,
            email_verified: false,
            phone_verified: true,
            phone_verification_code: '123456',
            two_factor_enabled: false,
            last_login: new Date()
        };

        chai.request(app)
            .post('/security')
            .send(newSecurity)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body.security_id).to.equal(securityId);
                done();
            });
    });

    // Test for GET request to retrieve a user security entry by ID
    it('should get a security entry by ID', (done) => {
        chai.request(app)
            .get(`/security/${securityId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.security_id).to.equal(securityId);
                done();
            });
    });

    // Test for PUT request to update a user security entry
    it('should update a security entry', (done) => {
        const updatedSecurity = {
            email_verified: false,
            two_factor_enabled: false
        };

        chai.request(app)
            .put(`/security/${securityId}`)
            .send(updatedSecurity)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.security_id).to.equal(securityId);
                done();
            });
    });

    // Test for DELETE request to delete a user security entry
    it('should delete a security entry', (done) => {
        chai.request(app)
            .delete(`/security/${securityId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.security_id).to.equal(securityId);
                done();
            });
    });

    // Test for GET request to retrieve all user security entries
    it('should get all security entries', (done) => {
        chai.request(app)
            .get('/security')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });
});
