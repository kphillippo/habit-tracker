const request = require('supertest');
const mongoose = require('mongoose');
const { app } = require('../index'); // Import your express app instance
const Friends = require('../models/Friends'); // Import your schema

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

describe('Friends API', () => {
    describe('Send Friend Request', () => {
    //Successfully sends a friend request
        test('Send Friend Request', async () => {

            //test data
            const testData = {
            User: '65f690238d4313103042bbe7',
            FriendsWith: 'testfriends2'
            };

            //send friend request
            const response = await request(app)
            .post('/api/friends/sendFriendRequest')
            .send(testData)
            .set('Accept', 'application/json');

            expect(response.status).toBe(200); // Assuming successful user creation returns status 200
        });

        //Fail to send a friend request, already sent a friend request to the user
        test('Fail to Send Friend Request, already sent a friend request to this user', async () => {

            //test data
            const testData = {
            User: '65f690238d4313103042bbe7',
            FriendsWith: 'testfriends2'
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
            User: '65f6902c8d4313103042bbeb',
            FriendsWith: 'testfriends1'
            };

            //send friend request
            const response = await request(app)
            .post('/api/friends/sendFriendRequest')
            .send(testData)
            .set('Accept', 'application/json');

            expect(response.status).toBe(400); // Assuming successful user creation returns status 400
            expect(response.body.error).toBe('You have a friend request from this user already!'); //expected error message
        });
    });

    describe('Accept Friend Request', () => {
    //Accept Friend Request
        test('Accept Friend Request', async () => {

            //test data
            const testData = {
                User: '65f6902c8d4313103042bbeb',
                FriendsWith: '65f690238d4313103042bbe7'
            };

            //send friend request
            const response = await request(app)
            .post('/api/friends/acceptFriendRequest')
            .send(testData)
            .set('Accept', 'application/json');

            expect(response.status).toBe(200); // Assuming successful user creation returns status 200
        });

        //fail to accept Friend Request, input error
        test('Fail to Accept Friend Request, input error', async () => {

            //test data
            const testData = {
                User: '65f6902c8d43131030',
                FriendsWith: '65f690238d431310'
            };

            //send friend request
            const response = await request(app)
            .post('/api/friends/acceptFriendRequest')
            .send(testData)
            .set('Accept', 'application/json');

            expect(response.status).toBe(400); // Assuming failed user creation returns status 200
        });
    });

    describe('leaderboard function', () => {
        //Return leaderboard function
        test('Return leaderboard function', async () => {

            //test data
            const testData = {
                User: '65f690238d4313103042bbe7'
            };
        
            //send friend request
            const response = await request(app)
            .post('/api/friends/returnLeaderBoard')
            .send(testData)
            .set('Accept', 'application/json');

            expect(response.status).toBe(200); // Assuming successful user creation returns status 200
        });

        //fail to Return leaderboard function, incorrect input
        test('Fail toReturn leaderboard function, incorrect input', async () => {

            //test data
            const testData = {
                User: '65f690238d43'
            };
        
            //send friend request
            const response = await request(app)
            .post('/api/friends/returnLeaderBoard')
            .send(testData)
            .set('Accept', 'application/json');

            expect(response.status).toBe(400); // Assuming failed user creation returns status 400
        });
    });

    describe('More Send Friend Request', () => {
        //Fail to send a friend request, already friends
        test('Fail to Send Friend Request, already friends', async () => {

            //test data
            const testData = {
                User: '65f6902c8d4313103042bbeb',
                FriendsWith: 'testfriends1'
            };

            //send friend request
            const response = await request(app)
            .post('/api/friends/sendFriendRequest')
            .send(testData)
            .set('Accept', 'application/json');

            expect(response.status).toBe(400); // Assuming successful user creation returns status 400
            expect(response.body.error).toBe('You are already friends with this user!'); //expected error message
        });

        //Fail to send a friend request, cannot friend yourself
        test('Fail to Send Friend Request, cannot friend yourself', async () => {

            //test data
            const testData = {
                User: '65f6902c8d4313103042bbeb',
                FriendsWith: 'testfriends2'
            };

            //send friend request
            const response = await request(app)
            .post('/api/friends/sendFriendRequest')
            .send(testData)
            .set('Accept', 'application/json');

            expect(response.status).toBe(400); // Assuming successful user creation returns status 400
            expect(response.body.error).toBe('You cannot friend yourself!'); //expected error message
        });

        //Fail to send a friend request, other errors(most liekelt input error)
        test('Fail to Send Friend Request, other errors', async () => {

            //test data
            const testData = {
            User: '65f6902c8d43131030',
            FriendsWith: 'testfriends'
            };
    
            //send friend request
            const response = await request(app)
            .post('/api/friends/sendFriendRequest')
            .send(testData)
            .set('Accept', 'application/json');
    
            expect(response.status).toBe(400); // Assuming successful user creation returns status 400
        });
    });

    describe('Delete Friend', () => {
        //Delete Friend
        test('Delete Friend', async () => {

            //test data
            const testData = {
                User: '65f6902c8d4313103042bbeb',
                FriendsWith: '65f690238d4313103042bbe7'
            };

            //send friend request
            const response = await request(app)
            .post('/api/friends/deleteFriend')
            .send(testData)
            .set('Accept', 'application/json');

            expect(response.status).toBe(200); // Assuming successful user creation returns status 200
        });

        //Fail to Delete Friend, invalid input
        test('Fail to Delete Friend, invalid input', async () => {

            //test data
            const testData = {
                User: '65f6902c8d431310304',
                FriendsWith: '65f690238d43131'
            };

            //send friend request
            const response = await request(app)
            .post('/api/friends/deleteFriend')
            .send(testData)
            .set('Accept', 'application/json');

            expect(response.status).toBe(400); // Assuming successful user creation returns status 200
        });
    });

    describe('Decline Friend Request', () => {
        //Decline Friend Request (creates a friend request first)
        test('Decline Friend Request', async () => {

            //test data
            const testData = {
                User: '65f690238d4313103042bbe7',
                FriendsWith: '65f6902c8d4313103042bbeb'
            };
        
            //send friend request
            const response = await request(app)
            .post('/api/friends/declineFriendRequest')
            .send(testData)
            .set('Accept', 'application/json');

            //test data2
            const testData2 = {
                User: '65f6902c8d4313103042bbeb',
                FriendsWith: '65f690238d4313103042bbe7'
            };

            //decline friend request
            const response2 = await request(app)
            .post('/api/friends/declineFriendRequest')
            .send(testData2)
            .set('Accept', 'application/json');

            expect(response2.status).toBe(200); // Assuming successful user creation returns status 200
        });

        //Fail to Decline Friend Request, other errors
        test('Fail to Decline Friend Request, other errors', async () => {

            //test data2
            const testData2 = {
                User: '65f6902c8d4313103042',
                FriendsWith: '65f690238d431310304'
            };

            //decline friend request
            const response2 = await request(app)
            .post('/api/friends/declineFriendRequest')
            .send(testData2)
            .set('Accept', 'application/json');

            expect(response2.status).toBe(400); // Assuming failed user creation returns status 400
        });
    });


    describe('Return a list of all friends', () => {

        //Return a list of all friends
        test('Return a list of all friends', async () => {

            //test data
            const testData = {
                User: '65f690238d4313103042bbe7'
            };
        
            //send friend request
            const response = await request(app)
            .post('/api/friends/returnFriendsList')
            .send(testData)
            .set('Accept', 'application/json');

            expect(response.status).toBe(200); // Assuming successful user creation returns status 200
        });

        //fail to Return a list of all friends, incorrect input
        test('Fail to Return a list of all friends, incorrect input', async () => {

            //test data
            const testData = {
                User: '65f690238d4313'
            };
        
            //send friend request
            const response = await request(app)
            .post('/api/friends/returnFriendsList')
            .send(testData)
            .set('Accept', 'application/json');

            expect(response.status).toBe(400); // Assuming failed user creation returns status 400
        });
    });
});