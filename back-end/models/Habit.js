const mongoose = require('mongoose');
const UserModel = require("./User");
const HabitCheckInModel = require("./HabitCheckIn");
const ObjectId = mongoose.Types.ObjectId;

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
    MeasurementType: {
        type: Number,
        required: true
    },
    Goal: {
        type: Number,
        required: true
    }
}, { collection: 'Habit'});

HabitSchema.statics.findHabits = async function(Owner) {
    return await this.find({Owner: Owner});
}

HabitSchema.statics.createHabit = async function(Owner, Title, MeasurementType, Goal) {
    const user = await UserModel.findById(Owner);
    if (!user) {
        throw Error('User does not exist!');
    }
    const habit = this.create({Owner, Title, MeasurementType, Goal});
    return habit;
}
/**
 * Function to update habit and return boolean which indicates if the update was successful
 **/
HabitSchema.statics.updateHabit = async function(HabitID, UserID, data) {
    const habit = await this.findOneAndUpdate({_id: HabitID, Owner: UserID}, {$set: data}, {new: true});
    if (!habit) {
        throw Error('Habit does not exist or you do not own this habit')
    }
    return true;
}

HabitSchema.statics.deleteHabit = async function(HabitID, UserID) {
    const habit = await this.findOneAndDelete({_id: HabitID, Owner: UserID});
    if (!habit) {
        throw Error('Habit does not exist or you do not own this habit')
    }
    return true;
}

HabitSchema.statics.getCompletedHabitsForDate = async function(UserID, thisDate) {
    const habits = await this.find({Owner: UserID});
    const habitIds = habits.map(habit => habit._id.toString());
    console.log(habitIds);
    console.log(thisDate);
    console.log(new Date(new Date(thisDate).setUTCHours(0, 0, 0, 0)));
    console.log(new Date(new Date(thisDate).setUTCHours(23, 59, 59, 999)));
    const habitCheckIns = await HabitCheckInModel.find({
        //HabitID: {$in: habitIds},
        CheckInTime: {
            $gte: new Date(new Date(thisDate).setUTCHours(0, 0, 0, 0)),
            $lt: new Date(new Date(thisDate).setUTCHours(23, 59, 59, 999))
        }
    });

    console.log(habitCheckIns);
    const mapping = habits.map(habit => {
        return {habitID: habit._id, Owner: habit.Owner, Title: habit.Title, Streak: habit.Streak, MeasurementType: habit.MeasurementType, Goal: habit.Goal, Status: habitCheckIns.some(habitCheckIn => habitCheckIn.HabitID.equals(habit._id))};
    });
    //console.log(mapping)
    return mapping;
}

//returns the number of userhabits that have not been done yet today
HabitSchema.statics.getNumUncompletedHabitsToday = async function(UserID) {

    const date = new Date();

    const numUsersHabits = await this.countDocuments({ Owner: UserID, LastCheckIn: { $ne: date } });

    return numUsersHabits
}

const HabitModel = mongoose.model("Habit", HabitSchema);
module.exports = HabitModel;