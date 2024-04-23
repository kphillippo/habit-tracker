const request = require('supertest');
const mongoose = require('mongoose');
const { app } = require('../index'); // Import your express app instance

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

describe('Group Habit API', () => {
    describe('createGroupHabit', () => {
        test('createGroupHabit', async () => {

            //make a habit
            const testData = {
                Owner: "661835d04bafa58fb7908dbf",
                Title: "AutoTest",
                MeasurementType: "2",
                Goal: "30"
            }

            //get image
            const response = await request(app)
            .post('/api/groupHabit/createGroupHabit')
            .send(testData);

            expect(response.status).toBe(200); // Assuming successful user creation returns status 200
        });

        test('fail to createGroupHabit', async () => {

            //make a habit
            const testData = {
                Owner: "661835d04bafa58fb7908d",
                Title: "AutoTest",
                MeasurementType: "2",
                Goal: "30"
            }

            //get image
            const response = await request(app)
            .post('/api/groupHabit/createGroupHabit')
            .send(testData);

            expect(response.status).toBe(400); // Assuming successful user creation returns status 200
        });
    });

    describe('returnGroupHabits', () => {
        test('returnGroupHabits', async () => {

            //make a habit
            const testData = {
                UserID: "661835d04bafa58fb7908dbf"
            }

            //get image
            const response = await request(app)
            .post('/api/groupHabit/returnGroupHabits')
            .send(testData);

            expect(response.status).toBe(200); // Assuming successful user creation returns status 200
        });

        test('fail to returnGroupHabits', async () => {

            //make a habit
            const testData = {
                UserID: "661835d04bafa58fb7908db"
            }

            //get image
            const response = await request(app)
            .post('/api/groupHabit/returnGroupHabits')
            .send(testData);

            expect(response.status).toBe(400); // Assuming successful user creation returns status 200
        });
    });

    describe('returnGroupHabitInfo', () => {
        test('returnGroupHabitInfo', async () => {

            //make a habit
            const testData = {
                GroupHabitID: "661b80ce9214150201f4d031"
            }

            //get image
            const response = await request(app)
            .post('/api/groupHabit/returnGroupHabitInfo')
            .send(testData);

            expect(response.status).toBe(200); // Assuming successful user creation returns status 200
        });

        test('fail to returnGroupHabitInfo', async () => {

            //make a habit
            const testData = {
                UserID: "661835d04bafa58fb7908db"
            }

            //get image
            const response = await request(app)
            .post('/api/groupHabit/returnGroupHabitInfo')
            .send(testData);

            expect(response.status).toBe(400); // Assuming successful user creation returns status 200
        });
    });

    describe('editGroupHabit', () => {
        test('editGroupHabit', async () => {

            //make a habit
            const testData = {
                GroupHabitID: "661b80ce9214150201f4d031",
                Title: "AutoTest",
                MeasurementType: "2",
                Goal: "30"
            }

            //get image
            const response = await request(app)
            .post('/api/groupHabit/editGroupHabit')
            .send(testData);

            expect(response.status).toBe(200); // Assuming successful user creation returns status 200
        });

        test('fail to editGroupHabit', async () => {

            //make a habit
            const testData = {
                GroupHabitID: "661835d04bafa58fb7908dbf",
                Title: "AutoTest",
                MeasurementType: "2",
                Goal: "30"
            }

            //get image
            const response = await request(app)
            .post('/api/groupHabit/editGroupHabit')
            .send(testData);

            expect(response.status).toBe(400); // Assuming successful user creation returns status 200
        });
    });

    describe('joinGroupHabit', () => {
        test('joinGroupHabit', async () => {

            //make a habit
            const testData = {
                GroupHabitID: "661b80ce9214150201f4d031",
                UserID: "65ee641ca982142253c9e07c"
            }

            //get image
            const response = await request(app)
            .post('/api/groupHabit/joinGroupHabit')
            .send(testData);

            expect(response.status).toBe(200); // Assuming successful user creation returns status 200
        });

        test('fail to joinGroupHabit', async () => {

            //make a habit
            const testData = {
                GroupHabitID: "661b80ce9214150201f4d031",
                UserID: "65ee641ca982142253c9e0"
            }


            //get image
            const response = await request(app)
            .post('/api/groupHabit/joinGroupHabit')
            .send(testData);

            expect(response.status).toBe(400); // Assuming successful user creation returns status 200
        });
    });

    describe('leaveGroupHabit', () => {
        /*test('leaveGroupHabit', async () => {

            //make a habit
            const testData = {
                GroupHabitID: "661b80ce9214150201f4d031",
                UserID: "65ee641ca982142253c9e07c"
            }

            //get image
            const response = await request(app)
            .post('/api/groupHabit/leaveGroupHabit')
            .send(testData);

            expect(response.status).toBe(200); // Assuming successful user creation returns status 200
        });*/

        test('fail to leaveGroupHabit', async () => {

            //make a habit
            const testData = {
                GroupHabitID: "661b80ce9214150201f4d031",
                UserID: "65ee641ca982142253c9e07c"
            }


            //get image
            const response = await request(app)
            .post('/api/groupHabit/leaveGroupHabit')
            .send(testData);

            expect(response.status).toBe(400); // Assuming successful user creation returns status 200
        });
    });
});