const mongoose = require('mongoose');
const UserModel = require("./User");
const FriendsModel = require('./Friends');

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

//adds user id and sets streak to 0
GroupHabitSchema.statics.joinHabit = async function(GroupHabitID, UserID) {
    try {
        // Find the group habit from the GroupHabit ID
        const groupHabit = await this.findById(GroupHabitID);

        // Push the new member to the Members array
        groupHabit.Members.push(UserID);

        // Push the new members streak of default 0 to the Streaks array
        groupHabit.Streak.push(0);

        // Save the updated group habit
        await groupHabit.save();
        return groupHabit;
    } catch (error) {
        throw new Error(error.message);
    }
}

//deletes a group habit
GroupHabitSchema.statics.deleteGroupHabit = async function(GroupHabitID) {
    try {
        await this.deleteOne({ _id: GroupHabitID });
    } catch (error) {
        throw new Error(error.message);
    }
}


//removes a user from a group habit(when the user deletes the group habit)
GroupHabitSchema.statics.removeUser = async function(User_id, GroupHabitID) {

    //gets the group habit
    const groupHabit = await this.findById(GroupHabitID);

    //gets the index of the Memebers array that the user id is in
    const memberIndex = groupHabit.Members.findIndex(member => member.equals(User_id));

    //removes the users id from the members array
    groupHabit.Members.splice(memberIndex, 1);

    //removes the number in the streak array at the index we got from the members array
    groupHabit.Streak.splice(memberIndex, 1);

    // Save the updated group habit
    await groupHabit.save();
}

//find the group habit by the id
GroupHabitSchema.statics.findById = async function(GroupHabitID) {
    //find the group habit by its unique ID
    const groupHabit = await this.findOne({ _id: GroupHabitID });

    return groupHabit;
}

//find the group habits made by either you or your friends
GroupHabitSchema.statics.findFriendsHabits = async function(UserID) {

    //gets list of you and your friends id's
    let friends = await FriendsModel.findFriends(UserID).select('FriendsWith');
    friends.push("yourAdditionalString");

    //finds all the group habits user and their friends have made
    const groupHabits = await GroupHabit.find({ Owner: { $in: friends } });

    return groupHabit;
}

const GroupHabitModel = mongoose.model("GroupHabit", GroupHabitSchema);
module.exports = GroupHabitModel;