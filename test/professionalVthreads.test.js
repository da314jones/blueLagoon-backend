const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Professional VThreads CRUD Operations', () => {
    let vthreadId;

    it('should create a new Professional VThread session', async () => {
        const newVThread = {
            topic: 'Effective Parenting Discussions',
            creator: 'Dr. Smith',
            industry: 'Psychology',
            credentials: 'PhD in Clinical Psychology',
            date: '2023-01-01',
            time: '19:00',
            discussion_url: 'https://example.com/parenting',
            is_active: true,
            archived: false,
            archive_link: 'https://example.com/archive1'
        };

        const res = await chai.request(app)
            .post('/professionalVThreads')
            .send(newVThread);

        expect(res).to.have.status(201);
        vthreadId = res.body.vthread_id;
    });

    it('should retrieve all Professional VThread sessions', async () => {
        const res = await chai.request(app).get('/professionalVThreads');
        expect(res).to.have.status(200);
    });

    it('should retrieve a specific Professional VThread session', async () => {
        const res = await chai.request(app).get(`/professionalVThreads/${vthreadId}`);
        expect(res).to.have.status(200);
    });

    it('should update a Professional VThread session', async () => {
        const updatedVThread = {
            topic: 'Updated Parenting Discussions',
            creator: 'Dr. Smith Updated',
            industry: 'Updated Psychology',
            credentials: 'Updated PhD',
            date: '2023-02-01',
            time: '20:00',
            discussion_url: 'https://example.com/updatedparenting',
            is_active: false,
            archived: true,
            archive_link: 'https://example.com/archive2'
        };

        const res = await chai.request(app)
            .put(`/professionalVThreads/${vthreadId}`)
            .send(updatedVThread);

        expect(res).to.have.status(200);
    });

    it('should delete a Professional VThread session', async () => {
        const res = await chai.request(app).delete(`/professionalVThreads/${vthreadId}`);
        expect(res).to.have.status(200);
    });
});
