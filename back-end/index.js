require("dotenv").config();
const express = require('express');
const app = express();
const env = process.env.NODE_ENV || "development";
const config = require("./config")[env];
const cors = require("cors");
const mongoose = require('mongoose');
const mongoDB = "mongodb+srv://"+process.env.USERNAME+":"+process.env.PASSWORD+"@"+config.database.host+":"+config.database.port+"/"+config.database.db;
const PORT = process.env.PORT || 8081;
const UserModel = require('./models/User.js');
const serverLink = "mongodb+srv://"+process.env.DBUSER+":"+process.env.PASSWORD+"@"+config.database.host+"/"+config.database.db;

app.use(express.json());
//app.use(cors());

mongoose.connect(serverLink);

//returns list of users
app.get("/getUser", async(req, res) =>{
    UserModel.find({})
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});

//creates a user
app.post("/createUser", async(req,res) =>{
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();

    res.json(user);
});


//listening function
app.listen(PORT,function(){
    console.log(`Sever is listening at port ${PORT}`);
});

