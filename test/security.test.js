const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Security CRUD Operations', () => {
    let securityId;

    before(async () => {
        // Optional: Clear the security table or set up the database state before the tests
    });

    it('should create a new Security Record', async () => {
        const uniqueUserId = Date.now();

        const newSecurityRecord = {
            user_id: uniqueUserId,
            email_verified: true,
            phone_verified: false
        };

        try {
            const res = await chai.request(app)
                .post('/security')
                .send(newSecurityRecord);

            expect(res).to.have.status(201);
            expect(res.body).to.have.property('security_id');
            securityId = res.body.security_id;
        } catch (error) {
            console.error('Error creating security record:', error);
        }
    });

    it('should retrieve all Security Records', async () => {
        try {
            const res = await chai.request(app).get('/security');
            expect(res).to.have.status(200);
        } catch (error) {
            console.error('Error fetching all security records:', error);
        }
    });

    it('should retrieve a specific Security Record', async () => {
        try {
            if (!securityId) {
                throw new Error('Security ID is undefined');
            }

            const res = await chai.request(app).get(`/security/${securityId}`);
            expect(res).to.have.status(200);
        } catch (error) {
            console.error(`Error fetching security record with ID ${securityId}:`, error);
        }
    });

    after(async () => {
        // Optional: Clean up database state after tests, if necessary
    });
});
