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
}, { collection: 'HabitCheckIn'});

HabitCheckInSchema.statics.findForDate = async function(HabitID, date) {
    return await this.find({
        HabitID: HabitID,
        CheckInTime: {
            $gte: new Date(new Date(date).setHours(0,0,0)),
            $lt: new Date(new Date(date).setHours(23, 59, 59))
        }
    });
}

const HabitCheckIn = mongoose.model('HabitCheckIn', HabitCheckInSchema);
module.exports = HabitCheckIn;