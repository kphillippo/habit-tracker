require("dotenv").config();
const express = require('express');
const app = express();
const env = process.env.NODE_ENV || "development";
const config = require("./config")[env];
const cors = require("cors");
const mongoose = require('mongoose');

//schema
const UserModel = require('./models/User.js');
const HabitModel = require('./models/Habit.js')
const FriendsModel = require('./models/Friends.js')

//variabes for routing
const serverLink = "mongodb+srv://"+process.env.DBUSER+":"+process.env.PASSWORD+"@cluster.rbzvfkr.mongodb.net/Habit_Tracker";
//const mongoDB = "mongodb+srv://"+process.env.USERNAME+":"+process.env.PASSWORD+"@"+config.database.host+":"+config.database.port+"/"+config.database.db;
const PORT = process.env.PORT || 8081;
const userRoutes = require('./routes/UserRoutes.js');
const habitRoutes = require('./routes/HabitRoutes.js');
const todoRoutes = require('./routes/TodoRoutes.js');
const friendsRoutes = require('./routes/FriendsRoutes.js');
const habitCheckInRoutes = require('./routes/HabitCheckInRoutes.js');
const todoCheckInRoutes = require('./routes/ToDoCheckInRoutes.js');
const verificationRoutes = require('./routes/VerificationRoutes.js');
const SettingsRoutes = require('./routes/SettingsRoutes.js');
const StatisticsRoutes = require('./routes/StatisticsRoutes.js');
const notificationsRoutes = require('./routes/NotificationsRoutes.js');
const imageRoutes = require('./routes/ImageRoutes.js');
const groupHabitRoutes = require('./routes/GroupHabitRoutes.js');


app.use(express.json());
app.use(cors());

//routes
app.use('/api/user', userRoutes)
app.use('/api/habit', habitRoutes)
app.use('/api/todo', todoRoutes)
app.use('/api/friends', friendsRoutes)
app.use('/api/habitCheckIn', habitCheckInRoutes)
app.use('/api/todoCheckIn', todoCheckInRoutes)
app.use('/api/verification', verificationRoutes)
app.use('/api/Settings', SettingsRoutes)
app.use('/api/stats', StatisticsRoutes)
app.use('/api/notifications', notificationsRoutes)
app.use('/api/images', imageRoutes);
app.use('/api/groupHabit', groupHabitRoutes);

mongoose.connect(serverLink);

//if testing it doesnt open the port
if (process.env.NODE_ENV !== 'test') {
    //listening function
    app.listen(PORT,function(){
        console.log(`Sever is listening at port ${PORT}`);
    });
}

module.exports = { app };