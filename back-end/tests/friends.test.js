const request = require('supertest');
const mongoose = require('mongoose');
const { app } = require('../index'); // Import your express app instance
const Freinds = require('../models/Friends'); // Import your schema

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

describe('Freinds API', () => {

    //Successfully sends a friend request
    test('Send Friend Request', async () => {

        //test data
        const testData = {
        User: '65ee641ca982142253c9e07c',
        FriendsWith: 'rational'
        };

        //send friend request
        const response = await request(app)
        .post('/api/friends/sendFriendRequest')
        .send(testData)
        .set('Accept', 'application/json');

        expect(response.status).toBe(200); // Assuming successful user creation returns status 200
    });

    //Fail to send a friend request, already friends
    test('Fail to Send Friend Request, already friends', async () => {

        //test data
        const testData = {
        User: '65f4aaf187bd736b657fe9ea',
        FriendsWith: 'zyf'
        };

        //send friend request
        const response = await request(app)
        .post('/api/friends/sendFriendRequest')
        .send(testData)
        .set('Accept', 'application/json');

        expect(response.status).toBe(400); // Assuming successful user creation returns status 400
        expect(response.body.error).toBe('You are already friends with this user!'); //expected error message
    });

    //Fail to send a friend request, already sent a friend request to the user
    test('Fail to Send Friend Request, already sent a friend request to this user', async () => {

        //test data
        const testData = {
        User: '65ee641ca982142253c9e07c',
        FriendsWith: 'rational'
        };

        //send friend request
        const response = await request(app)
        .post('/api/friends/sendFriendRequest')
        .send(testData)
        .set('Accept', 'application/json');

        expect(response.status).toBe(400); // Assuming successful user creation returns status 400
        expect(response.body.error).toBe('You have already sent a friend request to this user!'); //expected error message
    });

    //Fail to send a friend request, already have a friend request from the user
    test('Fail to Send Friend Request, already have a friend request from the user', async () => {

        //test data
        const testData = {
        User: '65ee645da982142253c9e080',
        FriendsWith: 'cristalKittyyyyyy'
        };

        //send friend request
        const response = await request(app)
        .post('/api/friends/sendFriendRequest')
        .send(testData)
        .set('Accept', 'application/json');

        expect(response.status).toBe(400); // Assuming successful user creation returns status 400
        expect(response.body.error).toBe('You have a friend request from this user already!'); //expected error message
    });

    //Fail to send a friend request, cannot friend yourself
    test('Fail to Send Friend Request, cannot friend yourself', async () => {

        //test data
        const testData = {
        User: '65ee641ca982142253c9e07c',
        FriendsWith: 'cristalKittyyyyyy'
        };

        //send friend request
        const response = await request(app)
        .post('/api/friends/sendFriendRequest')
        .send(testData)
        .set('Accept', 'application/json');

        expect(response.status).toBe(400); // Assuming successful user creation returns status 400
        expect(response.body.error).toBe('You cannot friend yourself!'); //expected error message
    });
});