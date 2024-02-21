const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
    Owner: {
        type: mongoose.ObjectId,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    LastCheckIn: {
        type: Date,
    },
    Streak: {
        type: Number,
        default: 0
    },
    /*
    * PrivacyType is an enum type
    * 0 - Public
    * 1 - Friends Only
    * 2 - Private
    * */
    PrivacyType: {
        type: Number,
        required: true
    },
    MeasurementType: {
        type: Number,
        required: true
    },
    Goal: {
        type: Number,
        required: true
    }
}, { collection: 'Habit'});

const HabitModel = mongoose.model("Habit", HabitSchema);
module.exports = HabitModel;