const mongoose = require('mongoose');

const StatisticsSchema = new mongoose.Schema({
    User: {
        type: mongoose.ObjectId,
        required: true
    },
    LongestStreak: {
        type: Number,
        default: 0
    },
    AllTimeHabits: {
        type: Number,
        default: 0
    },
    AllTimeToDos: {
        type: Number,
        default: 0
    }
}, { collection: 'Statistics' });

module.exports = mongoose.model('Statistics', StatisticsSchema);