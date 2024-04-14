const GroupHabit = require('../models/GroupHabit');
const Habit = require('../models/Habit');
const ObjectId = require('mongoose').Types.ObjectId;
const UserModel = require('../models/User');


//creates a group habit
const createGroupHabit = async (req, res) => {
    
    const {Owner, Title, MeasurementType, Goal} = req.body;
    try {
        const user_id = new ObjectId(Owner);

        //create the group habit record
        const habit = await GroupHabit.createHabit(user_id, Title, MeasurementType, Goal);
        
        //create the habit record with the grouphabit id 
        const id = habit._id
        await Habit.createGroupHabit(user_id, Title, MeasurementType, Goal, id);
        
        res.status(200).json(habit);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

//return all group habits that a user or thier friends have created
const returnGroupHabits = async (req, res) => {
    const {User, Title, MeasurementType, Goal} = req.body;
    try {
        const habit = await GroupHabit.editHabit(user_id, Title, MeasurementType, Goal);

    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

//Return all information for a group habit
const returnGroupHabitInfo = async (req, res) => {
    const {GroupHabitID} = req.body;
    try {
        //gets the grouphabit
        const habit = await GroupHabit.findById(GroupHabitID);

        //gets the userName of the owner
        const Owner = await UserModel.findById(habit.Owner)
        const OwnerUsername = Owner.Username

        //gets names of members in a list
        const memberNames = [];
        for (const memberId of habit.Members) {
            const member = await UserModel.findById(memberId);
            if (member) {
                memberNames.push(member.Username);
            }
        }

        //gets Streak list
        const Streaks = habit.Streak

        //Gets Title
        const Title = habit.Title

        //gets Goal
        const Goal = habit.Goal

        //Gets Measurement type
        const MeasurementType = habit.MeasurementType

        //returns everything
        res.status(200).json({ Title, Goal, MeasurementType, OwnerUsername, memberNames, Streaks});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

//edits a group habit
const editGroupHabit = async (req, res) => {
    const {GroupHabitID, Title, MeasurementType, Goal} = req.body;
    try {
        //updates group habit
        const habit = await GroupHabit.editHabit(GroupHabitID, Title, MeasurementType, Goal);

        //updates the habit record for everyone 
        await Habit.updateHabitsWithId(GroupHabitID, Title, MeasurementType, Goal);

        res.status(200).json(habit);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

//joins a group habit
const joinGroupHabit = async (req, res) => {
    const {GroupHabitID, UserID} = req.body;
    try {
        //adds your id to the group habit
        const habit = await GroupHabit.joinHabit(GroupHabitID, UserID);

        //create the habit record with the grouphabit id 
        const id = habit._id
        const Title = habit.Title
        const MeasurementType = habit.MeasurementType
        const Goal = habit.Goal
        await Habit.createGroupHabit(UserID, Title, MeasurementType, Goal, id);

        res.status(200).json("Joined successfully!");
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

//delete a group habit
const deleteGroupHabit = async (req, res) => {

    const {GroupHabitID} = req.body;
    try {
        //delete the habit for everyone who has the group habit id habit
        await Habit.massDelete(GroupHabitID);

        //delete the record of the grouphabit
        await GroupHabit.deleteGroupHabit(GroupHabitID);

        res.status(200).json("Deleted successfully!");   
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

//delete a group habit for a user from the group habit page
const leaveGroupHabit = async (req, res) => {
    const {GroupHabitID, UserID} = req.body;
    try {
        const habit = await GroupHabit.findById(GroupHabitID);

        //remove the user from the group habit arrays
        await GroupHabit.removeUser(UserID, habit.GroupHabitID);

        //delete the habit for the user
        await Habit.deleteHabit(Habit_id, UserID);

        res.status(200).json("Successfully Left Group Challange!");
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = { createGroupHabit, editGroupHabit, joinGroupHabit, deleteGroupHabit, leaveGroupHabit, returnGroupHabitInfo }