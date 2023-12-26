const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Users CRUD Operations', () => {
    let userId;

    it('should create a new User', async () => {
        const newUser = {
            username: 'newUser',
            email: 'newuser@example.com',
            password_hash: 'hashed_password',
            date_of_birth: '1990-01-01',
            is_age_verified: true,
            account_status: 'active',
            phone_number: '1234567899',
            profile_pic: 'new_profile_pic_url',
            interests: 'New Interests',
            challenges: 'New Challenges',
            experiences: 'New Experiences',
            locations: 'New York, NY',
            join_date: '2023-01-01',
            role: 'user',
            last_login: '2023-01-01 09:00:00'
        };

        const res = await chai.request(app)
            .post('/users')
            .send(newUser);

        expect(res).to.have.status(201);
        userId = res.body.user_id;
    });

    it('should retrieve all Users', async () => {
        const res = await chai.request(app).get('/users');
        expect(res).to.have.status(200);
    });

    it('should retrieve a specific User', async () => {
        const res = await chai.request(app).get(`/users/${userId}`);
        expect(res).to.have.status(200);
    });
});
