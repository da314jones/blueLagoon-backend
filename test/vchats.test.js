const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); 
const { createSessionAsync, generateToken } = require('../service/openTokService')
const expect = chai.expect;

chai.use(chaiHttp);

describe('VChats CRUD Operations', function() {
    let sessionId;

    // ... (Other imports)

    it('should create a new VChat session', async function()  {
        const sessionId = await createSessionAsync();
        const token = generateToken(sessionId);
        
        const newVChat = {
            host_user_id: 1,
            video_url: 'https://example.com/newvchat',
            schedule_time: new Date().toISOString(),
            duration: 60,
            archive_link: 'https://example.com/archive',
            start_time: new Date().toISOString(),
            end_time: new Date().toISOString(),
            archive_url: 'https://example.com/archiveurl',
            opentok_session_id: sessionId,
            token: token
        };
    
        const res = await chai.request(app)
            .post('/vchats')
            .send(newVChat);
    
        expect(res).to.have.status(201);
        // Add other assertions as needed
    });
    


    it('should retrieve a specific VChat session with Opentok details', async () => {
        const res = await chai.request(app).get(`/vchats/${sessionId}`);
        expect(res).to.have.status(200);
        expect(res.body).to.include.keys('opentok_session_id', 'token');
    });

    it('should update a VChat session without altering Opentok details', async () => {
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
        expect(res.body).to.have.property('opentok_session_id').that.is.not.null;
    });
    
    
    

    it('should delete a VChat session', async () => {
        const res = await chai.request(app).delete(`/vchats/${sessionId}`);
        expect(res).to.have.status(200);
        expect(res.body).to.include({ message: "Session deleted successfully"});
    });

    it('should retrieve all VChat sessions with OpenTok details', async () => {
        const res = await chai.request(app).get('/vchats');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        res.body.forEach(session => {
            expect(session).to.include.keys('opentok_session_id')
        })
    });
});
