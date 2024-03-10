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

  //create new user without errors
  test('Create new user', async () => {

    //deletes the user if it already exists
    const deleteUser = await request(app)
      .post('/api/user/delete')
      .send({ Username: 'testuser'})


    //test data
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

  test('User login', async () => {

    // Create a test user
    const testUser = new User({ username: 'testuser', password: 'password123' });
    await testUser.save();

    // Call the login static method
    const response = await request(app)
      .post('/api/user/login')
      .send({ username: 'testuser', password: 'password123' })
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body.errors).toBeDefined();

    console.log(response.body.errors);

    // Optionally, you can verify additional properties of the response
  });
});