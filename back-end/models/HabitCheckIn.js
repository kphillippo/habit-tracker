const mongoose = require('mongoose');
const GroupHabitModel = require("./GroupHabit");

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
            $gte: new Date(new Date(date).setUTCHours(0,0,0)),
            $lt: new Date(new Date(date).setUTCHours(23, 59, 59))
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

        //if the habit is a group habit it will update the grouphabit streak too
        if(habit.GroupHabitID){
            GroupHabitModel.streakLost(habit.GroupHabitID, habit.Owner);
        }
    } else {
        if (habit.lastCheckIn.toDateString() !== (new Date()).toDateString()) {
            if (habit.lastCheckIn.toDateString() === dayBefore.toDateString()) {
                habit.Streak += 1;

                //if the habit is a group habit it will update the grouphabit streak too
                if(habit.GroupHabitID){
                    GroupHabitModel.checkIn(habit.GroupHabitID, habit.Owner);
                }
                
            } else {
                habit.Streak = 1;

                //if the habit is a group habit it will update the grouphabit streak too
                if(habit.GroupHabitID){
                    GroupHabitModel.streakLost(habit.GroupHabitID, habit.Owner);
                }
            }
        }
    }
    habit.set("LastCheckIn", doc.CheckInTime);
    await habit.save();
    next();
});

const HabitCheckIn = mongoose.model('HabitCheckIn', HabitCheckInSchema);
module.exports = HabitCheckIn;