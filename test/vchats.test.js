const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Ensure this path is correct
const { expect } = chai;

chai.use(chaiHttp);

describe('VChats CRUD Operations', function () {
  let vchatId;

  it('should create a new VChat session', async function () {
    const newVChat = {
      opentok_session_id: 'new session id',
      session_name: 'New Test Session',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: 'active',
      duration: 60,
      session_type: 'group',
      host_id: 'newHost',
      recording_status: 'started'
    };

    const res = await chai.request(app)
      .post('/vchats')
      .send(newVChat);

    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
    vchatId = res.body.id; // Assuming ID is returned directly in the response
  });

  it('should retrieve the specific VChat session created', async () => {
    const res = await chai.request(app).get(`/vchats/${vchatId}`);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(vchatId);
  });

  it('should update the specific VChat session', async () => {
    const updatedVChat = {
      opentok_session_id: '3_MX40NzgzMzA5MX5-MTcwMzc4NzI4MzU2Nn4',
      session_name: 'Chat Session 3',
      created_at: '2023-12-30T02:47:44.490Z',
      updated_at: '2023-12-30T07:47:44.490Z',
      status: 'inactive',
      duration: 60,
      session_type: 'group',
      host_id: 'host3',
      recording_status: 'stopped'
    };
  
    const res = await chai.request(app)
      .put(`/vchats/${vchatId}`)
      .send(updatedVChat);
  
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.updatedVChat).to.be.an('object');
    expect(res.body.updatedVChat.id).to.equal(vchatId);
  });
  

  it('should retrieve all VChat sessions', async () => {
    const res = await chai.request(app).get('/vchats');

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.allVChats).to.be.an('array');
    const createdVChat = res.body.allVChats.find(vchat => vchat.id === vchatId);
    expect(createdVChat).to.not.be.undefined;
  });

  it('should delete the specific VChat session', async () => {
    const res = await chai.request(app).delete(`/vchats/${vchatId}`);

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message', 'VChat successfully deleted');
  });
});
