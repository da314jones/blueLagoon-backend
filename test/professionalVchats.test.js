const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Professional VChats CRUD Operations', () => {
    let vchatId;

    it('should create a new Professional VChat session', async () => {
        const newVChat = {
            topic: 'New Topic',
            creator: 'New Creator',
            industry: 'New Industry',
            credentials: 'New Credentials',
            date: '2023-01-01',
            time: '10:00',
            video_url: 'https://example.com/newvchat',
            is_live: false,
            archived: false
        };

        const res = await chai.request(app)
            .post('/professionalVChats')
            .send(newVChat);

        expect(res).to.have.status(201);
        vchatId = res.body.vchat_id;
    });

    it('should retrieve a specific Professional VChat session', async () => {
        const res = await chai.request(app).get(`/professionalVChats/${vchatId}`);
        expect(res).to.have.status(200);
    });

    it('should update a Professional VChat session', async () => {
        const updatedVChat = {
            topic: 'Updated Topic',
            creator: 'Updated Creator',
            industry: 'Updated Industry',
            credentials: 'Updated Credentials',
            date: '2023-02-01',
            time: '11:00',
            video_url: 'https://example.com/updatedvchat',
            is_live: true,
            archived: false
        };

        const res = await chai.request(app)
            .put(`/professionalVChats/${vchatId}`)
            .send(updatedVChat);

        expect(res).to.have.status(200);
        const expectedDate = new Date(updatedVChat.date).toISOString().split('T')[0];
        const actualDate = new Date(res.body.date).toISOString().split('T')[0];
        expect(actualDate).to.equal(expectedDate);
    });

    it('should delete a Professional VChat session', async () => {
        const res = await chai.request(app).delete(`/professionalVChats/${vchatId}`);
        expect(res).to.have.status(200);
    });

    it('should retrieve all Professional VChat sessions', async () => {
        const res = await chai.request(app).get('/professionalVChats');
        expect(res).to.have.status(200);
    });
});
