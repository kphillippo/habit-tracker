const request = require('supertest');
const mongoose = require('mongoose');
const { app } = require('../index'); // Import your express app instance
const Friends = require('../models/Settings'); // Import your schema

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

describe('Settings API', () => {

    //Successfully gets settings
    test('Get Settings', async () => {

        //get settings request
        const response = await request(app)
        .post('/api/settings/getSettings?user_id=66060fc7c794aa2f294f20fa')

        expect(response.status).toBe(200); // Assuming successful test returns status 200
    });

    //fails to get settings
    test('Fail to Get Settings', async () => {

        //get settings request
        const response = await request(app)
        .post('/api/settings/getSettings?user_id=66060fc7c794aa2f294p')

        expect(response.status).toBe(400); // Assuming failed test returns status 400
    });

    //Successfully sets settings
    test('Set Settings', async () => {

        //test data
        const userData = {
            User: "66060fc7c794aa2f294f20fa",
            DisplayProfileToFriends: true,
            DisplayName: false,
            DisplayEmail: true,
            DisplayPhoto: false,
            DisplayStreaks: false,
            DisplayStats: false,
            AllowEmails: true,
            HabitEmails: true,
            ToDoEmails: true,
            FriendRequestEmails: true,
            GroupChallangeEmails: true,
            MainColor: 0,
            FontSize: 1
          }

        //set settings request
        const response = await request(app)
        .post('/api/settings/setSettings')
        .send(userData)

        expect(response.status).toBe(200); // Assuming successful test returns status 200
    });

    //fails to set settings
    test('Fail to Set Settings', async () => {

        //test data
        const userData = {
            User: "66060fc7c794aa2f294f",
            DisplayProfileToFriends: true,
            DisplayName: false,
            DisplayEmail: true,
            DisplayPhoto: false,
            DisplayStreaks: false,
            DisplayStats: false,
            AllowEmails: true,
            HabitEmails: true,
            ToDoEmails: true,
            FriendRequestEmails: true,
            GroupChallangeEmails: true,
            MainColor: 0,
            FontSize: 1
          }

        //set settings request
        const response = await request(app)
        .post('/api/settings/setSettings')
        .send(userData)

        expect(response.status).toBe(400); // Assuming failed test returns status 400
    });

});