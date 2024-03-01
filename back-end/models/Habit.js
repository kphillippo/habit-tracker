const mongoose = require('mongoose');
const UserModel = require("./User");

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

HabitSchema.statics.findHabits = async function(Owner) {
    return await this.find({Owner: Owner});
}

HabitSchema.statics.createHabit = async function(Owner, Title, PrivacyType, MeasurementType, Goal) {
    const user = await UserModel.findById(Owner);
    if (!user) {
        throw Error('User does not exist!');
    }
    const habit = this.create({Owner, Title, PrivacyType, MeasurementType, Goal});
    return habit;
}

HabitSchema.statics.updateHabit = async function(HabitID, UserID, field_name, field_value) {
    const habit = await this.findById(HabitID);
    if (!habit) {
        throw Error('Habit does not exist!');
    }
    const user = await UserModel.findById(UserID);
    if (!user) {
        throw Error('User does not exist!');
    }
    if (habit.Owner !== UserID) {
        throw Error('User does not own this habit!');
    }
    habit.set(field_name, field_value);
    habit.save();
    return habit;
}

const HabitModel = mongoose.model("Habit", HabitSchema);
module.exports = HabitModel;