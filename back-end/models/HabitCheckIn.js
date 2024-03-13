const mongoose = require('mongoose');

const HabitCheckInSchema = new mongoose.Schema({
    HabitID:{
        type: mongoose.ObjectId,
        required: true
    },
    Count:{
        type: Number,
        required: true,
        default: 0
    },
    CheckInTime:{
        type: Date,
        required: true
    }
}, { collection: 'ToDoCheckIn'});