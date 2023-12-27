const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Adjust this path to your main app file
const { expect } = chai;
chai.use(chaiHttp);
require("dotenv").config();
NODE_ENV=test


describe('Password Reset Tests', () => {
const resetToken = process.env.TEST_TOKEN;

    // Test for sending a reset password email
    it('should send a reset password email when requested', (done) => {
        chai.request(app)
            .post('/password-reset/request-reset')
            .send({ email: 'djonesgrace@gmail.com' }) // Use a valid email from your test database
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message', 'Password reset email sent');
                // Extract the resetToken from the response if possible, or set it up manually
                // resetToken = res.body.resetToken; // Adjust this according to your actual response
                done();
            });
    });

    // Test for resetting the password with a valid token
    it('should reset the password when provided with a valid reset token', (done) => {
        // Use the resetToken obtained from the previous test
        const newPassword = 'NewPassword123!';
        chai.request(app)
            .post('/password-reset/reset')
            .send({ token: resetToken, newPassword }) // Replace 'resetToken' with an actual token if needed
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message', 'Password reset successful');
                done();
            });
    });

    // Test for handling an invalid reset token
    it('should return an error when provided with an invalid reset token', (done) => {
        const invalidResetToken = 'invalid-token';
        const newPassword = 'NewPassword123!';
        chai.request(app)
            .post('/password-reset/reset')
            .send({ token: invalidResetToken, newPassword })
            .end((err, res) => {
                expect(res).to.have.status(401); // Assuming 401 for invalid token
                expect(res.body).to.have.property('error');
                done();
            });
    });
});
