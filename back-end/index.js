require("dotenv").config();
const express = require("express");
const app = express();
<<<<<<< Updated upstream

const PORT = process.env.PORT ||8081;
=======
const env = process.env.NODE_ENV || "development";
const config = require("./config")[env];
const cors = require("cors");
const mongoose = require("mongoose");
const mongoDB = "mongodb+srv://"+process.env.USERNAME+":"+process.env.PASSWORD+"@"+config.database.host+":"+config.database.port+"/"+config.database.db;
const PORT = process.env.PORT || 8081;
const UserModel = require('./models/User');

mongoose.connect("mongodb+srv://"+process.env.USERNAME+":"+process.env.PASSWORD+"@"+config.database.host+"/"+config.database.db);

//mongoose.connect('mongodb+srv://lysa200125:AppYay@cluster.rbzvfkr.mongodb.net/Habit_tracker');

app.get("/getUser", async(req, res) =>{
    await UserModel.find({});
})
>>>>>>> Stashed changes

//listening function
app.listen(PORT,function(){
    console.log(`Sever is listening at port ${PORT}`);
<<<<<<< Updated upstream
})
=======
})

>>>>>>> Stashed changes
