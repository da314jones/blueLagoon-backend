const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Notifications CRUD Operations', () => {
    let notificationId;

    it('should create a new Notification', async () => {
        const newNotification = {
            user_id: 1,
            type: 'Reminder',
            message: 'Upcoming Event Reminder',
            date: '2021-01-01 09:00:00'
        };

        const res = await chai.request(app)
            .post('/notifications')
            .send(newNotification);

        expect(res).to.have.status(201);
        notificationId = res.body.id;
    });

    it('should retrieve all Notifications', async () => {
        const res = await chai.request(app).get('/notifications');
        expect(res).to.have.status(200);
    });

    it('should retrieve a specific Notification', async () => {
        const res = await chai.request(app).get(`/notifications/${notificationId}`);
        expect(res).to.have.status(200);
    });
});
