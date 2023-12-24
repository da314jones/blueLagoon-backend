const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = require('supertest');
const app = require('../app.js');describe('Chat Messages CRUD Operations', () => {
    let messageId;

    it('should create a new chat message', async () => {
        const newMessage = {
            session_id: 1,
            user_id: 1,
            message: 'Test message',
            timestamp: new Date().toISOString()
        };

        const res = await request(app)
            .post('/chatmessages')
            .send(newMessage);

        expect(res).to.have.status(201);
        expect(res.body).to.include(newMessage);
        messageId = res.body.message_id; // Save for other tests
    });

    it('should get a chat message by ID', async () => {
        const res = await request(app).get(`/chatmessages/${messageId}`);
        expect(res).to.have.status(200);
        expect(res.body.message_id).to.equal(messageId);
    });

    it('should update a chat message', async () => {
        const updatedMessage = {
            message: 'Updated message'
        };

        const res = await request(app)
            .put(`/chatmessages/${messageId}`)
            .send(updatedMessage);

        expect(res).to.have.status(200);
        expect(res.body.message).to.equal(updatedMessage.message);
    });

    it('should delete a chat message', async () => {
        const res = await request(app).delete(`/chatmessages/${messageId}`);
        expect(res).to.have.status(200);
        expect(res.body.message_id).to.equal(messageId);
    });

    it('should get all chat messages', async () => {
        const res = await request(app).get('/chatmessages');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
    });
});
