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

    expect(response.status).toBe(200); // Assuming successful user creation returns status 200
    
    // You can add more assertions as needed
  });

  //create a new user with an email that alread exists
  test('Fail create new user, email in use', async () => {

    //test data
    const userData = {
      FirstName: 'test',
      LastName: 'tester',
      Email: 'tester@email.com',
      Username: 'testuser2',
      Password: 'passwordW1!'
    };

    //signs up user 
    const response = await request(app)
    .post('/api/user/signup')
    .send(userData)
    .set('Accept', 'application/json');

    expect(response.status).toBe(400); // Assuming failed user creation returns status 400
    expect(response.body.error).toBe('Email already in use!'); //expected error message
    
    // You can add more assertions as needed
  });

  //create a new user with an username that alread exists
  test('Fail create new user, username in use', async () => {

    //test data
    const userData = {
      FirstName: 'test',
      LastName: 'tester',
      Email: 'tester2@email.com',
      Username: 'testuser',
      Password: 'passwordW1!'
    };

    //signs up user 
    const response = await request(app)
    .post('/api/user/signup')
    .send(userData)
    .set('Accept', 'application/json');

    expect(response.status).toBe(400); // Assuming failed user creation returns status 400
    expect(response.body.error).toBe('Username already in use!'); //expected error message
    
    // You can add more assertions as needed
  });

  //create a new user with password not good enough
  test('Fail create new user, password not good enough', async () => {

    //test data
    const userData = {
      FirstName: 'test',
      LastName: 'tester',
      Email: 'tester2@email.com',
      Username: 'testuser2',
      Password: 'password'
    };

    //signs up user 
    const response = await request(app)
    .post('/api/user/signup')
    .send(userData)
    .set('Accept', 'application/json');

    expect(response.status).toBe(400); // Assuming failed user creation returns status 400
    expect(response.body.error).toBe('Password must contain a capital, a lowercase, a symbol and 8 characters total!'); //expected error message
    
    // You can add more assertions as needed
  });

  //create a new user with email not in email format
  test('Fail create new user, email not in email format', async () => {

    //test data
    const userData = {
      FirstName: 'test',
      LastName: 'tester',
      Email: 'tester2',
      Username: 'testuser2',
      Password: 'passwordW1!'
    };

    //signs up user 
    const response = await request(app)
    .post('/api/user/signup')
    .send(userData)
    .set('Accept', 'application/json');

    expect(response.status).toBe(400); // Assuming failed user creation returns status 400
    expect(response.body.error).toBe('Email is not valid!'); //expected error message
    
    // You can add more assertions as needed
  });

  //create a new user with not all fields filled
  test('Fail create new user, not all fields filled', async () => {

    //test data
    const userData = {
      FirstName: '',
      LastName: '',
      Email: '',
      Username: '',
      Password: ''
    };

    //signs up user 
    const response = await request(app)
    .post('/api/user/signup')
    .send(userData)
    .set('Accept', 'application/json');

    expect(response.status).toBe(400); // Assuming failed user creation returns status 400
    expect(response.body.error).toBe('All fields must be filled!'); //expected error message
    
    // You can add more assertions as needed
  });

//login a user
  test('User login', async () => {

    // Call the login static method
    const response = await request(app)
      .post('/api/user/login')
      .send({ Username: 'testuser', Password: 'passwordW1!' })

    expect(response.status).toBe(200);
    
  });
});