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

describe('Verification/Email API', () => {

    //Successfully sends an email
    test('Send Email', async () => {

        //test data
        const testData = {
            to: "lysa200125@gmail.com",
            subject: "Test Email",
            text: "This is a test email sent from the MERN stack backend."
          }

        //get settings request
        const response = await request(app)
        .post('/api/verification/sendEmail')
        .send(testData)

        expect(response.status).toBe(200); // Assuming successful test returns status 200
    });

    //Fail to send an email
    test('Fail to send Email', async () => {

        //test data
        const testData = {
            to: "lysa200125",
            subject: "Test Email",
            text: "This is a test email sent from the MERN stack backend."
          }

        //get settings request
        const response = await request(app)
        .post('/api/verification/sendEmail')
        .send(testData)

        expect(response.status).toBe(500); // Assuming Failed test returns status 400
    });

});