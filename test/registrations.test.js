const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Registrations CRUD Operations', () => {
    let registrationId;

    it('should create a new Registration', async () => {
        const newRegistration = {
            user_id: 1,
            email: 'newuser@example.com',
            registration_started: new Date().toISOString(),
            agree_to_terms_of_service: true
        };

        const res = await chai.request(app)
            .post('/registrations')
            .send(newRegistration);

        expect(res).to.have.status(201);
        registrationId = res.body.registration_id;
    });

    it('should retrieve all Registrations', async () => {
        const res = await chai.request(app).get('/registrations');
        expect(res).to.have.status(200);
    });

    it('should retrieve a specific Registration', async () => {
        const res = await chai.request(app).get(`/registrations/${registrationId}`);
        expect(res).to.have.status(200);
    });
});
