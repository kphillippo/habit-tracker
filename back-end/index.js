require("dotenv").config();
const express = require('express');
const app = express();
const env = process.env.NODE_ENV || "development";
const config = require("./config")[env];
const cors = require("cors");
const mongoose = require('mongoose');
//const mongoDB = "mongodb+srv://"+process.env.USERNAME+":"+process.env.PASSWORD+"@"+config.database.host+":"+config.database.port+"/"+config.database.db;
const PORT = process.env.PORT || 8081;
const UserModel = require('./models/User.js');
const HabitModel = require('./models/Habit.js')
const serverLink = "mongodb+srv://"+process.env.DBUSER+":"+process.env.PASSWORD+"@"+config.database.host+"/"+config.database.db;

const userRoutes = require('./routes/UserRoutes.js');
const habitRoutes = require('./routes/HabitRoutes.js');

app.use(express.json());
app.use(cors());

//routes
app.use('/api/user', userRoutes)
app.use('/api/habit', habitRoutes)

mongoose.connect(serverLink);

//listening function
app.listen(PORT,function(){
    console.log(`Sever is listening at port ${PORT}`);
});

