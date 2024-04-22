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

StatisticsSchema.statics.FindOrCreate = async function(User) {
    const stats = await this.findOne({User: User});
    if (stats) {
        return stats;
    } else {
        return this.create({User: User});
    }
}

module.exports = mongoose.model('Statistics', StatisticsSchema);