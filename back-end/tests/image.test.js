const request = require('supertest');
const mongoose = require('mongoose');
const { app } = require('../index'); // Import your express app instance
const image = require('../models/image'); // Import your schema

// MongoDB connection string
const serverLink = `mongodb+srv://${process.env.DBUSER}:${process.env.PASSWORD}@cluster.rbzvfkr.mongodb.net/Habit_Tracker`;

// Connect to the MongoDB database before running tests
beforeAll(async () => {
  await mongoose.connect(serverLink, { useNewUrlParser: true });
});

// Disconnect from the MongoDB database after running tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Image API', () => {
    describe('getImage', () => {
        test('Getimage user profile image', async () => {

            //get image
            const response = await request(app)
            .get('/api/images/662478b40cc43274f373cd93');

            expect(response.status).toBe(200); // Assuming successful user creation returns status 200
        });

        test(' Fail to Getimage user profile image', async () => {

            //get image
            const response = await request(app)
            .get('/api/images/662478b40cc43274f373cd9');

            expect(response.status).toBe(500); // Assuming failed status 500
        });

        test(' Fail to Getimage user profile image image not there', async () => {

            //get image
            const response = await request(app)
            .get('/api/images/662478b40cc43274f373cd95');

            expect(response.status).toBe(404); // Assuming failed status 500
        });
    });

    describe('getImageNew', () => {
        test('Getimage user profile image for a friend', async () => {

            //test data
            const testData = {
                userId: "661ea9663068e42c29769144",
                isForFriend: true
            };

            //get image
            const response = await request(app)
            .post('/api/images/getImage').send(testData)
            .set('Accept', 'application/json');

            expect(response.status).toBe(200); // Assuming successful user creation returns status 200
        });

        test('Getimage user profile image not for a friend', async () => {

            //test data
            const testData = {
                userId: "661ea9663068e42c29769144",
                isForFriend: false
            };

            //get image
            const response = await request(app)
            .post('/api/images/getImage').send(testData)
            .set('Accept', 'application/json');

            expect(response.status).toBe(200); // Assuming successful user creation returns status 200
        });

        test(' Fail to Getimage user profile image', async () => {

            //test data
            const testData = {
                userId: "661ea9663068e42c2976914",
                isForFriend: false
            };

            //get image
            const response = await request(app)
            .post('/api/images/getImage').send(testData)
            .set('Accept', 'application/json');

            expect(response.status).toBe(500); // Assuming failed status 500
        });

        test(' Fail to Getimage user not found', async () => {

            //test data
            const testData = {
                userId: "661ea9663068e42c29769147",
                isForFriend: false
            };

            //get image
            const response = await request(app)
            .post('/api/images/getImage').send(testData)
            .set('Accept', 'application/json');

            expect(response.status).toBe(404); // Assuming failed status 500
        });
    });
});