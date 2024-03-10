/*please add all test cases in this folder 
 *additionally you must add ".test.js" at the end of your test case file names
 *please use the models name for the test files
 *to run test cases you must first "npm start" the back end then in a new terminal do "npm test"
 */

// Load environment variables from .env file
require('dotenv').config();

// Import necessary modules
const request = require('supertest');
const mongoose = require('mongoose');
const { app } = require('../index'); // Import your express app instance
const User = require('../models/User'); // Import your schema

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

describe('User API', () => {

  //for a test case heres an example to hopefully make it easier when making other test cases
  test('Create new user', async () => {

    //deletes the user if it already exists
    const deleteUser = await request(app)
      .post('/api/user/delete')
      .send({ username: 'testuser'})

    const userData = {
      FirstName: 'test',
      LastName: 'tester',
      Email: 'tester@email.com',
      Username: 'testuser',
      Password: 'passwordW1!'
    };

    //signs up user 
    const response = await request(app)
    .post('/api/user/signup')
    .send(userData)
    .set('Accept', 'application/json');

    expect(response.status).toBe(200); // Assuming successful user creation returns status 201
    
    // You can add more assertions as needed
  });

  test('Create new user', async () => {

    //deletes the user if it already exists
    const deleteUser = await request(app)
      .post('/api/user/delete')
      .send({ username: 'testuser'})

    const userData = {
      FirstName: 'test',
      LastName: 'tester',
      Email: 'tester@email.com',
      Username: 'testuser',
      Password: 'passwordW1!'
    };

    //signs up user 
    const response = await request(app)
    .post('/api/user/signup')
    .send(userData)
    .set('Accept', 'application/json');

    expect(response.status).toBe(200); // Assuming successful user creation returns status 201
    
    // You can add more assertions as needed
  });

  /*can add more tests after too just by doing this:
  test('other Terstcase', async () => {

   //code here

  });
*/
});