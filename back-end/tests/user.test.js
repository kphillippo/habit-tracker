// Load environment variables from .env file
require('dotenv').config();

// Import necessary modules
const request = require('supertest');
const mongoose = require('mongoose');
const { app } = require('../index'); // Import your express app instance
const User = require('../models/User'); // Import your schema
const _id = '65f3a52aa08c8a8cafda8d4c';

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
  });

  //login a user
  test('User login', async () => {

    // Call the login static method
    const response = await request(app)
      .post('/api/user/login')
      .send({ Username: 'testuser', Password: 'passwordW1!' })

    expect(response.status).toBe(200);// Assuming successful user login returns status 200
  });

  //login a user not all fields filled
  test('Fail user login, not all field filled', async () => {

    // Call the login static method
    const response = await request(app)
      .post('/api/user/login')
      .send({ Username: '', Password: '' })

    expect(response.status).toBe(400);// Assuming failed user login returns status 400
    expect(response.body.error).toBe('All fields must be filled!'); //expected error message
  });

  //login a user with invalid username
  test('Fail user login, invalid username', async () => {

    // Call the login static method
    const response = await request(app)
      .post('/api/user/login')
      .send({ Username: 'fail', Password: 'fail' })

    expect(response.status).toBe(400);// Assuming failed user login returns status 400
    expect(response.body.error).toBe('That user does not exist!'); //expected error message
  });

   //login a user with invalid password
  test('Fail user login, invalid password', async () => {

    // Call the login static method
    const response = await request(app)
      .post('/api/user/login')
      .send({ Username: 'testuser', Password: 'fail' })

    expect(response.status).toBe(400);// Assuming failed user login returns status 400
    expect(response.body.error).toBe('Incorrect Password!'); //expected error message
  });

  //access profile info
  test('Access Profile Info', async () => {

    // Call the getUserprofileInfo static method
    const response = await request(app)
      .post('/api/user/userProfileInfo?user_id=65ee645da982142253c9e080')
      .send({ _id: '65ee645da982142253c9e080'})

    expect(response.status).toBe(200);// Assuming successful user profile info access returns status 200
  });

  //access profile info, someone with no friends
  test('Access Profile Info, someone with no friends', async () => {

    // Call the getUserprofileInfo static method
    const response = await request(app)
      .post('/api/user/userProfileInfo?user_id=65f3a52aa08c8a8cafda8d4c')
      .send({ _id: '65f3a52aa08c8a8cafda8d4c'})

    expect(response.status).toBe(200);// Assuming successful user profile info access returns status 200
  });

  //fail to access profile info, wrong id
  test('Fail to Access Profile Info', async () => {

    // Call the getUserprofileInfo static method
    const response = await request(app)
      .post('/api/user/userProfileInfo?user_id=65ee645da982142253c9e081')
      .send({ _id: '65ee645da982142253c9e081'})

    expect(response.status).toBe(400);// Assuming failed user profile info access returns status 400
  });

  //Sucessful update profile info
  test('Update Profile Info', async () => {

    //test data
    const userData = {
      _id: _id,
      FirstName: 'John',
      LastName: 'Doe',
      Email: 'JohnDoe@email.com',
      Username: 'JohnDoe'
    };

    // Call the updateUserInfo static method
    const response = await request(app)
      .post('/api/user/updateUserInfo')
      .send(userData)

    expect(response.status).toBe(200);// Assuming failed user profile info access returns status 400
  });

  //fail to update profile info, username already exists
  test('Fail to update Profile Info, username already exists', async () => {

    //test data
    const userData = {
      _id: _id,
      FirstName: 'test',
      LastName: 'tester',
      Email: 'tester123@email.com',
      Username: 'testuser'
    };

    // Call the updateUserInfo static method
    const response = await request(app)
      .post('/api/user/updateUserInfo')
      .send(userData)

    expect(response.status).toBe(400);// Assuming failed user profile info access returns status 400
    expect(response.body.error).toBe('Username already exists!'); //expected error message
  });

  //fail to update profile info, email already in use
  test('Fail to update Profile Info, email already in use', async () => {

    //test data
    const userData = {
      _id: _id,
      FirstName: 'test',
      LastName: 'tester',
      Email: 'tester@email.com',
      Username: 'testuser123'
    };

    // Call the updateUserInfo static method
    const response = await request(app)
      .post('/api/user/updateUserInfo')
      .send(userData)

    expect(response.status).toBe(400);// Assuming failed user profile info access returns status 400
    expect(response.body.error).toBe('Email already in use!'); //expected error message
  });

  //Update users password
  test('Update users password', async () => {

    //test data
    const userData = {
      _id: _id,
      Password: 'Password!1',
      newPassword:'Password!2'
    };

    // Call the updateUserInfo static method
    const response = await request(app)
      .post('/api/user/updatePassword')
      .send(userData)

    expect(response.status).toBe(200);// Assuming failed user profile info access returns status 200

    //change it again so it works again next time
    //test data
    const userData2 = {
      _id: _id,
      Password: 'Password!2',
      newPassword:'Password!1'
    };

    // Call the updateUserInfo static method
    const response2 = await request(app)
      .post('/api/user/updatePassword')
      .send(userData2)
  });

  //Fail to Update users password, incorrect password
  test('Fail to update users password, incorrect password', async () => {

    //test data
    const userData = {
      _id: _id,
      Password: 'Password!2',
      newPassword:'Password!2'
    };

    // Call the updateUserInfo static method
    const response = await request(app)
      .post('/api/user/updatePassword')
      .send(userData)

    expect(response.status).toBe(400);// Assuming failed user profile info access returns status 400
    expect(response.body.error).toBe('Incorrect Password!'); //expected error message
  });

  //Fail to Update users password, new password must be different then current password
  test('Fail to update users password, new password must be different then current password', async () => {

    //test data
    const userData = {
      _id: _id,
      Password: 'Password!1',
      newPassword:'Password!1'
    };

    // Call the updateUserInfo static method
    const response = await request(app)
      .post('/api/user/updatePassword')
      .send(userData)

    expect(response.status).toBe(400);// Assuming failed user profile info access returns status 400
    expect(response.body.error).toBe('Your new password must be different from your current password!'); //expected error message
  });

  //Fail to Update users password, new password must contain a capital, a lowercase, a symbol and 8 characters total
  test('Fail to update users password, new password must contain a capital, a lowercase, a symbol and 8 characters total', async () => {

    //test data
    const userData = {
      _id: _id,
      Password: 'Password!1',
      newPassword:'Password'
    };

    // Call the updateUserInfo static method
    const response = await request(app)
      .post('/api/user/updatePassword')
      .send(userData)

    expect(response.status).toBe(400);// Assuming failed user profile info access returns status 400
    expect(response.body.error).toBe('Password must contain a capital, a lowercase, a symbol and 8 characters total!'); //expected error message
  });

  //delete user
  test('Delete user', async () => {

    // Call the delete static method
    const response = await request(app)
      .post('/api/user/delete')
      .send({ Username: 'testuser'})

    expect(response.status).toBe(200);// Assuming successful user deletion returns status 200
  });

  //delete user when user doesnt exist
  test('Fail delete user, user doesn not exist', async () => {

    // Call the delete static method
    const response = await request(app)
      .post('/api/user/delete')
      .send({ Username: 'testuser'})

    expect(response.status).toBe(500);// Assuming failed user deletion returns status 500
    expect(response.body.error).toBe('User not found!'); //expected error message
  });
});