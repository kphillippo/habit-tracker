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

describe('Notifications API', () => {

    describe('Return Notifications', () => {
        //Successfully Return Notifications
        test('Return Notifications', async () => {

            //test data
            const testData = {
                User: "661702c98e0ec2f952ebd9bc"
            }

            //get notifications request
            const response = await request(app)
            .post('/api/notifications/returnNotifications')
            .send(testData)

            expect(response.status).toBe(200); // Assuming successful test returns status 200
        });

        //Fail to Return Notifications
        test('Fail to Return Notifications', async () => {

            //test data
            const testData = {
                User: "661702c98e0ec2f952ebd"
            }

            //get notifications request
            const response = await request(app)
            .post('/api/notifications/returnNotifications')
            .send(testData)

            expect(response.status).toBe(400); // Assuming Failed test returns status 400
        });
    });

    describe('Delete Notification', () => {
        //Successfully Delete Notifications
        test('Delete Notification', async () => {

             //test data
             const testData1 = {
                User: '661702c98e0ec2f952ebd9bc',
                FriendsWith: 'bob'
            };
            
            //send friend request
            const response1 = await request(app)
            .post('/api/friends/sendFriendRequest')
            .send(testData1)
            .set('Accept', 'application/json');

            //test data
            const testData2 = {
                User: "661835d04bafa58fb7908dbf"
            }

            //delete notifications request
            const response2 = await request(app)
            .post('/api/notifications/deleteNotification')
            .send(testData2)

            expect(response2.status).toBe(200); // Assuming successful test returns status 200
        });
    });

    describe('Return Number of Notifications', () => {
        //Successfully Return Notifications
        test('Return Number of Notifications', async () => {

            //test data
            const testData = {
                User: "661702c98e0ec2f952ebd9bc"
            }

            //get notifications nom of request
            const response = await request(app)
            .post('/api/notifications/numOfNotifications')
            .send(testData)

            expect(response.status).toBe(200); // Assuming successful test returns status 200
        });

        //Fail to Return Notifications
        test('Fail to Return Number of Notifications', async () => {

            //test data
            const testData = {
                User: "661702c98e0ec2f952ebd"
            }

            //get notifications nom of request
            const response = await request(app)
            .post('/api/notifications/numOfNotifications')
            .send(testData)

            expect(response.status).toBe(400); // Assuming Failed test returns status 400
        });
    });

    describe('Make Notification on Login Depending on Number of Habits', () => {
        //Successfully Return Notifications
        test('Login with 1 habit and 1 notification', async () => {

            //make a habit
            const testData1 = {
                Owner: "6619d49947ae9b77d3b79196",
                Title: "Test1",
                MeasurementType: "2",
                Goal: "30"
            }
            const response1 = await request(app)
            .post('/api/habit/createHabit')
            .send(testData1)
            expect(response1.status).toBe(200);

            //make a todo
            const testData2 = {
                Owner: "6619d49947ae9b77d3b79196",
                Title: "Test1",
                Date: Date.now(),
                Repeat: false,
                Remind: false
            }
            const response2 = await request(app)
            .post('/api/todo/createTodo')
            .send(testData2)
            expect(response2.status).toBe(200);

            //login
            const testData3 = {
                Username: "AnotherTester",
                Password: "Password1!"
            }

            //get notifications num of request
            const response3 = await request(app)
            .post('/api/user/login')
            .send(testData3)

            expect(response3.status).toBe(200); // Assuming successful test returns status 200

            //delete created habits
            await request(app)
            .delete('/api/habit/deleteHabit')
            .query({ user_id: "6619d49947ae9b77d3b79196", habit_id: response1.body._id });

            //delete creates todos
            await request(app)
            .delete('/api/todo/deleteTodo')
            .query({ user_id: "6619d49947ae9b77d3b79196", todo_id: response2.body._id });

        });

        //Successfully Return Notifications
        test('Login with 2 habits and 2 notifications', async () => {

            //make a habit
            const testData1 = {
                Owner: "6619d49947ae9b77d3b79196",
                Title: "Test1",
                MeasurementType: "2",
                Goal: "30"
            }
            const response1 = await request(app)
            .post('/api/habit/createHabit')
            .send(testData1)
            expect(response1.status).toBe(200);

            //make a todo
            const testData2 = {
                Owner: "6619d49947ae9b77d3b79196",
                Title: "Test1",
                Date: Date.now(),
                Repeat: false,
                Remind: false
            }
            const response2 = await request(app)
            .post('/api/todo/createTodo')
            .send(testData2)
            expect(response2.status).toBe(200);

            //make a habit
            const testData4 = {
                Owner: "6619d49947ae9b77d3b79196",
                Title: "Test1",
                MeasurementType: "2",
                Goal: "30"
            }
            const response4 = await request(app)
            .post('/api/habit/createHabit')
            .send(testData4)
            expect(response4.status).toBe(200);

            //make a todo
            const testData5 = {
                Owner: "6619d49947ae9b77d3b79196",
                Title: "Test1",
                Date: Date.now(),
                Repeat: false,
                Remind: false
            }
            const response5 = await request(app)
            .post('/api/todo/createTodo')
            .send(testData5)
            expect(response5.status).toBe(200);

            //login
            const testData3 = {
                Username: "AnotherTester",
                Password: "Password1!"
            }

            //get notifications num of request
            const response3 = await request(app)
            .post('/api/user/login')
            .send(testData3)

            expect(response3.status).toBe(200); // Assuming successful test returns status 200

            //delete created habits
            await request(app)
            .delete('/api/habit/deleteHabit')
            .query({ user_id: "6619d49947ae9b77d3b79196", habit_id: response1.body._id });

            await request(app)
            .delete('/api/habit/deleteHabit')
            .query({ user_id: "6619d49947ae9b77d3b79196", habit_id: response4.body._id });

            //delete creates todos
            await request(app)
            .delete('/api/todo/deleteTodo')
            .query({ user_id: "6619d49947ae9b77d3b79196", todo_id: response2.body._id });

            await request(app)
            .delete('/api/todo/deleteTodo')
            .query({ user_id: "6619d49947ae9b77d3b79196", todo_id: response5.body._id });
            
            //deletes the notifications that were created
            const testData6 = {
                User: "6619d49947ae9b77d3b79196"
            }

            //get notifications num of request
            const response6 = await request(app)
            .post('/api/notifications/deleteNotifications')
            .send(testData6)
        });
    });
});