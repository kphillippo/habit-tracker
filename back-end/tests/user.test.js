const {MongoClient} = require('mongodb');
const env = process.env.NODE_ENV || "development";
const config = require("../config.js")[env];
const serverLink = "mongodb+srv://"+process.env.DBUSER+":"+process.env.PASSWORD+"@cluster.rbzvfkr.mongodb.net/";
const request = require('supertest');
const app = require('../index.js')

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect("mongodb+srv://lysa200125:AppYay@cluster.rbzvfkr.mongodb.net/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db("Habit_Tracker");
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Create a valid User', async() => {

    const mockUser = {
      "FirstName": "Lysa",
      "LastName": "Hannes",
      "Email": "Testing@email.com",
      "Username": "Kitty",
      "Password": "Password1!",
      "Streak": 0
    };

    const response = await request(app).post('/api/user/signup').send({mockUser});

    expect(response.statusCode).toBe(200);
    
  });

  /*
  //test for sign up
  it('should insert a user into collectionm then if try to sign up a user thats already inserted, it fails', async () => {
    const users = db.collection('User');

    //if you sign up a user it works
    const mockUser = {
        "FirstName": "Lysa",
        "LastName": "Hannes",
        "Email": "Testing@email.com",
        "Username": "Kitty",
        "Password": "Password1!",
        "Streak": 0
      };
    await users.insertOne(mockUser);

    //if try to sign up a user thats already inserted, it fails
    const mockUser2 = {
        "FirstName": "Lysa",
        "LastName": "Hannes",
        "Email": "Testing@email.com",
        "Username": "Kitty",
        "Password": "Password1!",
        "Streak": 0
      };
    await(expect(users.insertOne(mockUser2)).rejects.toThrowError());
  });

  //test for sign up
  it('if try to insert a user with same email, but differnt username as someone, it fails', async () => {
    const users = db.collection('User');

    //if try to insert a user with same email, but differnt username as someone, it fails
    const mockUser3 = {
        "FirstName": "Lysa",
        "LastName": "Hannes",
        "Email": "Testing@email.com",
        "Username": "Lysa",
        "Password": "Password1!",
        "Streak": 0
      };
    await(expect(users.insertOne(mockUser3)).rejects.toThrowError());
  });

  //test for sign up
  it('if try to insert a user with same username, but differnt email as someone, it fails', async () => {
    const users = db.collection('User');

    //if try to insert a user with same username, but differnt email as someone, it fails
    const mockUser4 = {
        "FirstName": "Lysa",
        "LastName": "Hannes",
        "Email": "Tester@email.com",
        "Username": "Kitty",
        "Password": "Password1!",
        "Streak": 0
      };
    await(expect(users.insertOne(mockUser4)).rejects.toThrowError());
  });

  //test for sign up
  it('if the password isnt good enough, it fails', async () => {
    const users = db.collection('User');

    //if the password isnt good enough, it fails
    const mockUser5 = {
        "FirstName": "Lysa",
        "LastName": "Hannes",
        "Email": "Tester@email.com",
        "Username": "Lysa",
        "Password": "test",
        "Streak": 0
      };
    await(expect(users.insertOne(mockUser5)).rejects.toThrowError());
  });*/
});