const mongoose = require('mongoose');
const UserModel = require("./User");

const GroupHabitSchema = new mongoose.Schema({
    Owner: {
        type: mongoose.ObjectId,
        required: true
    },
    Members: {
        type: [mongoose.ObjectId],
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    MeasurementType: {
        type: Number,
        required: true
    },
    Streak:{
        type: [Number],
        required: true
    },
    Goal: {
        type: Number,
        required: true
    }
}, { collection: 'GroupHabit'});

//creates a group habit
GroupHabitSchema.statics.createHabit = async function(Owner, Title, MeasurementType, Goal) {

    // Initialize Members and strak arrays with the owner ObjectId and streak
    const Members = [Owner];
    const Streak = [0];

    //creates the record
    const habit = await this.create({ Owner, Title, MeasurementType, Goal, Members, Streak });
    return habit;
}

//edits a group habit
GroupHabitSchema.statics.editHabit = async function(_id, Title, MeasurementType, Goal) {

    //find the group habit
    const groupHabit = await this.findById(_id);

    // Update the properties of the group habit
    groupHabit.Title = Title;
    groupHabit.MeasurementType = MeasurementType;
    groupHabit.Goal = Goal;

    // Save the updated group habit
    await groupHabit.save();

    return groupHabit; 
}

//incriments the streak by 1 when the user checks in thier habit
GroupHabitSchema.statics.checkIn = async function(GroupHabitID, UserID) {
    try {
        // Find the group habit from the GroupHabit ID
        const groupHabit = await this.findById(GroupHabitID);

        // Find the index in the Members array where the UserID is located
        const memberIndex = groupHabit.Members.findIndex(member => member.equals(UserID));

        // Add one to the streak at the index found above
        groupHabit.Streak[memberIndex]++;

        // Save the updated group habit
        await groupHabit.save();
    } catch (error) {
        throw new Error(error.message);
    }
}

//sets the streak to 1
GroupHabitSchema.statics.streakLost = async function(GroupHabitID, UserID) {
    try {
        // Find the group habit from the GroupHabit ID
        const groupHabit = await this.findById(GroupHabitID);

        // Find the index in the Members array where the UserID is located
        const memberIndex = groupHabit.Members.findIndex(member => member.equals(UserID));

        // Add one to the streak at the index found above
        groupHabit.Streak[memberIndex] = 1;

        // Save the updated group habit
        await groupHabit.save();
    } catch (error) {
        throw new Error(error.message);
    }
}


const GroupHabitModel = mongoose.model("GroupHabit", GroupHabitSchema);
module.exports = GroupHabitModel;