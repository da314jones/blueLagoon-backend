const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Ensure this path correctly points to your app.js
const expect = chai.expect;

chai.use(chaiHttp);

describe('VChats CRUD Operations', () => {
    let sessionId;

    it('should create a new VChat session', async () => {
        const newVChat = {
            host_user_id: 1, // Example user ID
            video_url: 'https://example.com/newvchat',
            schedule_time: new Date().toISOString(),
            duration: 60,
            archive_link: 'https://example.com/archive',
            start_time: new Date().toISOString(),
            end_time: new Date().toISOString(),
            archive_url: 'https://example.com/archiveurl'
        };

        const res = await chai.request(app)
            .post('/vchats')
            .send(newVChat);

        expect(res).to.have.status(201);
        expect(res.body).to.include.keys('session_id', 'host_user_id', 'video_url');
        sessionId = res.body.session_id; // Save for later tests
    });

    it('should retrieve a specific VChat session', async () => {
        const res = await chai.request(app).get(`/vchats/${sessionId}`);
        expect(res).to.have.status(200);
        expect(res.body).to.include.keys('session_id', 'host_user_id', 'video_url');
    });

    it('should update a VChat session', async () => {
        const updatedVChat = {
            host_user_id: 1, // Include this as it's required
            video_url: 'https://example.com/updatedvchat',
            duration: 90,
            archive_link: 'https://example.com/newarchive',
            // Include other fields if they are also required
        };
    
        const res = await chai.request(app)
            .put(`/vchats/${sessionId}`)
            .send(updatedVChat);
    
        if (res.status !== 200) {
            console.error("Update VChat Error Response:", res.body);
        }
    
        expect(res).to.have.status(200);
        expect(res.body).to.include(updatedVChat);
    });
    
    
    

    it('should delete a VChat session', async () => {
        const res = await chai.request(app).delete(`/vchats/${sessionId}`);
        expect(res).to.have.status(200);
        expect(res.body).to.include.keys('session_id');
    });

    it('should retrieve all VChat sessions', async () => {
        const res = await chai.request(app).get('/vchats');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
    });
});
