const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Password Reset Tests', () => {
    it('should send a reset password email when requested', (done) => {
        chai
            .request(app)
            .post('/correct-path-for-reset-password-request') // Update the path
            .send({ email: 'zxtwelver@me.com' }) // Replace with a valid email
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').to.equal('Reset password email sent successfully.');
                done();
            });
    });

    it('should reset the password when provided with a valid reset token', (done) => {
        const resetToken = 'valid-reset-token'; // Replace with a valid reset token
        const newPassword = 'MyNewPassword123'; // Replace with the new password

        chai
            .request(app)
            .post(`/correct-path-for-reset-password/${resetToken}`) // Update the path
            .send({ newPassword })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').to.equal('Password reset successfully.');
                done();
            });
    });

    it('should return an error when provided with an invalid reset token', (done) => {
        const invalidResetToken = 'invalid-reset-token'; // Replace with an invalid reset token
        const newPassword = 'MyNewPassword123'; // Replace with the new password

        chai
            .request(app)
            .post(`/correct-path-for-reset-password/${invalidResetToken}`) // Update the path
            .send({ newPassword })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error').to.equal('Invalid reset token.');
                done();
            });
    });
});
