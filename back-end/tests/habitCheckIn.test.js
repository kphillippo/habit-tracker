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
const Habit = require('../models/Habit'); // Import your schema
const HabitCheckIn = require('../models/HabitCheckIn'); // Import your schema

// MongoDB connection string
const serverLink = `mongodb+srv://${process.env.DBUSER}:${process.env.PASSWORD}@cluster.rbzvfkr.mongodb.net/Habit_Tracker`;


let habit;
// Connect to the MongoDB database before running tests
beforeAll(async () => {
  await mongoose.connect(serverLink, { useNewUrlParser: true });
  habit = await Habit.create({ Owner: "60c4a6d3e4d5e0a5e8a1b3e5", Title: "Test Habit", MeasurementType: "1", Goal: 10 });
});

// Disconnect from the MongoDB database after running tests
afterAll(async () => {
  await Habit.findByIdAndDelete(habit._id);
  await mongoose.connection.close();
});

describe('Habit Check In API', () => {
  test('Create a new habit check in successfully', async () => {
    const res = await request(app)
      .post('/api/habitCheckIn/updateHabitCheckIn')
      .send({ HabitID: habit._id, Count: 5 });
    await HabitCheckIn.findOneAndDelete({HabitID: habit._id, Count: 5});
    expect(res.statusCode).toBe(200);
  });
  test('Successfully create and update a habit check in', async () => {
const res = await request(app)
      .post('/api/habitCheckIn/updateHabitCheckIn')
      .send({ HabitID: habit._id, Count: 5 });
    await HabitCheckIn.findOneAndDelete({HabitID: habit._id, Count: 5});
    expect(res.statusCode).toBe(200);
  });
});