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
const ToDo = require('../models/ToDo'); // Import your Schema
const User = require('../models/User');

// MongoDB connection string
const serverLink = `mongodb+srv://${process.env.DBUSER}:${process.env.PASSWORD}@cluster.rbzvfkr.mongodb.net/Habit_Tracker`;
let userID;
// Connect to the MongoDB database before running tests
beforeAll(async () => {
  await mongoose.connect(serverLink, { useNewUrlParser: true });
  let create = await request(app)
      .post('/api/user/signup')
      .send({ FirstName: 'test9', LastName: 'tester7', Email: 'test@test.test', Username: 'testing97', Password: 'Password1!', Streak: 0})
      .set('Accept', 'application/json');
  userID = await request(app)
      .post('/api/user/login')
      .send({ Username: 'testing97', Password: 'Password1!' })
      .set('Accept', 'application/json');
  userID = userID.body._id;
});

// Disconnect from the MongoDB database after running tests
afterAll(async () => {
  await request(app)
    .post('/api/user/delete')
    .send({ Username: 'testing97' });
  await mongoose.connection.close();
});

describe('ToDo API', () => {


  //for a test case here's an example to hopefully make it easier when making other test cases (I had to comment it cus it doesn't like the same test running twice for some reason)
  describe('Create ToDo', () => {
    test('Create new ToDo Successfully', async () => {
      let response = await request(app)
          .post('/api/todo/createTodo')
          .send({ Owner: userID, Title: 'test', Date: Date.now(), Repeat: true, Remind: true});
      expect(response.status).toBe(200);
      await request(app)
          .delete('/api/todo/deleteTodo')
          .query({ user_id: userID, todo_id: response.body._id });
    });
    test('Create new ToDo with invalid Owner', async () => {
      let response = await request(app)
          .post('/api/todo/createTodo')
          .send({ Owner: '123123123123123123123123', Title: 'test', Date: Date.now(), Repeat: true, Remind: true});
      expect(response.status).toBe(400);
    });
  });
  describe('Delete ToDo', () => {
    test('Delete ToDo Successfully', async () => {
      let response1 = await request(app)
          .post('/api/todo/createTodo')
          .send({ Owner: userID, Title: 'test', Date: Date.now(), Repeat: true, Remind: true});
      let response2 = await request(app)
          .delete('/api/todo/deleteTodo')
          .query({user_id: userID, todo_id: response1.body._id});
      expect(response2.status).toBe(200);
    });
    test('Delete ToDo with invalid Id', async () => {
      let response = await request(app)
          .delete('/api/todo/deleteTodo')
          .query({ user_id: userID, todo_id: 'abcabcabcabcabcabcabcabc'});
      expect(response.status).toBe(400);
    });
  });
  describe('Get ToDos', () => {
    test('Get ToDos Successfully', async () => {
      let response = await request(app)
          .get('/api/todo/getTodos')
          .query({ user_id: userID });
      expect(response.status).toBe(200);
    });
    test('Get ToDos with invalid UserId', async () => {
      let response = await request(app)
          .get('/api/todo/getTodos')
          .query({ user_id: 'abcabcabcabcabcabcabcabc'});
      expect(response.status).toBe(400);
    });
  });
});