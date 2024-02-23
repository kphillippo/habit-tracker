import mongoose from "mongoose";


const GroupHabitSchema = new mongoose.Schema({
    Owner: {
        type: mongoose.ObjectId,
        required: true
    },
    Members: {
        type: [mongoose.ObjectId],
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    LastCheckIn: {
        type: Date,
    },
    Streak: [{
        Member: mongoose.ObjectId,
        Count: Number
    }],
    MeasurementType: {
        type: Number,
        required: true
    },
    Goal: {
        type: Number,
        required: true
    }
}, { collection: 'Habit'});