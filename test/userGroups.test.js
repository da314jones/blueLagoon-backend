const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('User Groups CRUD Operations', () => {
    let userGroupId;

    it('should create a new User Group', async () => {
        const newUserGroup = {
            user_id: 1,
            group_id: 1,
            join_date: '2021-01-01'
        };

        const res = await chai.request(app)
            .post('/userGroups')
            .send(newUserGroup);

        expect(res).to.have.status(201);
        userGroupId = res.body.id;
    });

    it('should retrieve all User Groups', async () => {
        const res = await chai.request(app).get('/userGroups');
        expect(res).to.have.status(200);
    });

    it('should retrieve a specific User Group', async () => {
        const res = await chai.request(app).get(`/userGroups/${userGroupId}`);
        expect(res).to.have.status(200);
    });
});
