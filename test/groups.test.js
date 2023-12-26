const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Groups CRUD Operations', () => {
    let groupId;

    it('should create a new Group', async () => {
        const newGroup = {
            group_name: 'Single Fathers Group',
            description: 'A group for single fathers',
            creation_date: '2021-01-01'
        };

        const res = await chai.request(app)
            .post('/groups')
            .send(newGroup);

        expect(res).to.have.status(201);
        groupId = res.body.id;
    });

    it('should retrieve all Groups', async () => {
        const res = await chai.request(app).get('/groups');
        expect(res).to.have.status(200);
    });

    it('should retrieve a specific Group', async () => {
        const res = await chai.request(app).get(`/groups/${groupId}`);
        expect(res).to.have.status(200);
    });
});
