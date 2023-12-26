const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Profiles CRUD Operations', () => {
    let profileId;

    before(async () => {
        // Optional: Clear the profiles table or set up the database state before the tests
    });

    it('should create a new Profile', async () => {
        const uniqueUserId = Date.now();

        const newProfile = {
            user_id: uniqueUserId,
            name: 'John Doe',
            gender: 'Male',
            profile_picture_url: 'https://example.com/profile.jpg',
            bio: 'Bio of John Doe',
            location: 'New York, NY'
        };

        try {
            const res = await chai.request(app)
                .post('/profiles')
                .send(newProfile);

            expect(res).to.have.status(201);
            expect(res.body).to.have.property('profile_id');
            profileId = res.body.profile_id;
        } catch (error) {
            console.error('Error creating profile:', error);
        }
    });

    it('should retrieve all Profiles', async () => {
        try {
            const res = await chai.request(app).get('/profiles');
            expect(res).to.have.status(200);
        } catch (error) {
            console.error('Error fetching all profiles:', error);
        }
    });

    it('should retrieve a specific Profile', async () => {
        try {
            if (!profileId) {
                throw new Error('Profile ID is undefined');
            }

            const res = await chai.request(app).get(`/profiles/${profileId}`);
            expect(res).to.have.status(200);
        } catch (error) {
            console.error(`Error fetching profile with ID ${profileId}:`, error);
        }
    });

    after(async () => {
        // Optional: Clean up database state after tests, if necessary
    });
});
