require("dotenv").config();
const express = require("express");
const app = express();
const env = process.env.NODE_ENV || "development";
const config = require("./config")[env];
const cors = require("cors");
const mongoose = require("mongoose");
const mongoDB = "mongodb+srv://"+process.env.USERNAME+":"+process.env.PASSWORD+"@"+config.database.host+":"+config.database.port+"/"+config.database.db;
const PORT = process.env.PORT || 8081;
const UserModel = require('./models/User.js');

app.use(express.json());

const serverLink = "mongodb+srv://"+process.env.USERNAME+":"+process.env.PASSWORD+"@"+config.database.host+"/"+config.database.db;

//mongoose.connect(serverLink);

mongoose.connect('mongodb+srv://lysa200125:AppYay@cluster.rbzvfkr.mongodb.net/Habit_tracker');



app.get("/getUser", (req, res) =>{
    UserModel.find({})
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});

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

