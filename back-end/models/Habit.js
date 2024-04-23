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
    },
    GroupHabitID: {
        type: mongoose.ObjectId,
    }
}, { collection: 'Habit'});

HabitSchema.statics.findHabits = async function(Owner) {
    return await this.find({Owner: Owner});
}

HabitSchema.statics.createGroupHabit = async function(Owner, Title, MeasurementType, Goal, GroupHabitID) {
    const user = await UserModel.findById(Owner);
    if (!user) {
        throw Error('User does not exist!');
    }
    const habit = this.create({Owner, Title, MeasurementType, Goal, GroupHabitID});
    return habit;
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
    const habitCheckIns = await HabitCheckInModel.find({
        HabitID: {$in: habitIds},
        CheckInTime: {
            $gte: new Date(new Date(thisDate).setUTCHours(0, 0, 0, 0)),
            $lt: new Date(new Date(thisDate).setUTCHours(23, 59, 59, 999))
        }
    });
    const mapping = habits.map(habit => {
        return {habitID: habit._id, Owner: habit.Owner, Title: habit.Title, Streak: habit.Streak, MeasurementType: habit.MeasurementType, Goal: habit.Goal, Status: habitCheckIns.some(habitCheckIn => habitCheckIn.HabitID.equals(habit._id))};
    });
    return mapping;
}

HabitSchema.post('remove', async function(doc, next) {
    await HabitCheckInModel.deleteMany({HabitID: doc._id});
    next();
});

//returns the number of userhabits that have not been done yet today
HabitSchema.statics.getNumUncompletedHabitsToday = async function(UserID) {
    const today = new Date();
    const truncatedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const numUsersHabits = await this.countDocuments({ Owner: UserID, LastCheckIn: { $ne: truncatedDate } });

    return numUsersHabits;
}

//updates every habit with a specific group id
HabitSchema.statics.updateHabitsWithId = async function(GroupHabitID, Title, MeasurementType, Goal) {
    try {
        // Update all records that have an ID associated with them
        const result = await this.updateMany({ GroupHabitID: { $in: GroupHabitID } }, { Title, MeasurementType, Goal });

        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

//mass deletes all habits with a specific GroupHabitID
HabitSchema.statics.massDelete = async function(GroupHabitID) {
    try {
        // Update all records that have an ID associated with them
        await this.deleteMany({ GroupHabitID: { $in: GroupHabitID } });
    } catch (error) {
        throw new Error(error.message);
    }
}

//returns the owner of a habit
HabitSchema.statics.returnOwner = async function(GroupHabitID) {
    const habit = await this.findOne({ _id: GroupHabitID});
    return habit.Owner
}

const HabitModel = mongoose.model("Habit", HabitSchema);
module.exports = HabitModel;