const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Ensure this path correctly points to your app.js
const expect = chai.expect;

chai.use(chaiHttp);

describe('VThreads CRUD Operations', () => {
    let threadId;

    it('should create a new VThread session', async () => {
        const newVThread = {
            host_user_id: 1,
            title: 'New VThread',
            description: 'Description of new VThread',
            video_url: 'https://example.com/newvthread',
            duration: 60
        };

        const res = await chai.request(app)
            .post('/vthreads')
            .send(newVThread);

        expect(res).to.have.status(201);
        expect(res.body).to.include.keys('thread_id', 'host_user_id', 'title', 'video_url', 'duration', 'created_at', 'updated_at');
        threadId = res.body.thread_id;
    });

    it('should retrieve a specific VThread session', async () => {
        const res = await chai.request(app).get(`/vthreads/${threadId}`);
        expect(res).to.have.status(200);
        expect(res.body).to.include.keys('thread_id', 'host_user_id', 'title', 'video_url', 'duration', 'created_at', 'updated_at');
    });

    it('should update a VThread session', async () => {
        const updatedVThread = {
            title: 'Updated VThread',
            description: 'Updated description',
            video_url: 'https://example.com/updatedvthread',
            duration: 90
        };

        const res = await chai.request(app)
            .put(`/vthreads/${threadId}`)
            .send(updatedVThread);

        expect(res).to.have.status(200);
        expect(res.body).to.include(updatedVThread);
    });

    it('should delete a VThread session', async () => {
        const res = await chai.request(app).delete(`/vthreads/${threadId}`);
        expect(res).to.have.status(200);
        expect(res.body).to.include.keys('thread_id');
    });

    it('should retrieve all VThread sessions', async () => {
        const res = await chai.request(app).get('/vthreads');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
    });
});
