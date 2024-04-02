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

HabitCheckInSchema.post('save', async function(doc, next) {
    const Habit = require('./Habit');
    const habit = await Habit.findById(doc.HabitID);
    let dayBefore = new Date(doc.CheckInTime.getTime());
    dayBefore.setDate(dayBefore.getDate() - 1);
    if (habit.lastCheckIn === undefined || habit.lastCheckIn === null) {
        habit.Streak = 1;
    } else {
        if (habit.lastCheckIn.toDateString() === dayBefore.toDateString()) {
            habit.Streak += 1;
        } else {
            habit.Streak = 1;
        }
    }
    habit.set("LastCheckIn", doc.CheckInTime);
    await habit.save();
    next();
});

const HabitCheckIn = mongoose.model('HabitCheckIn', HabitCheckInSchema);
module.exports = HabitCheckIn;