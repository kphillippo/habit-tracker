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

const HabitModel = mongoose.model("Habit", HabitSchema);
module.exports = HabitModel;