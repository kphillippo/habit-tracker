const Habit = require('../models/Habit');
const GroupHabit = require('../models/GroupHabit');
const ObjectId = require('mongoose').Types.ObjectId;
const getHabits = async (req, res) => {
    try {
        const Owner = new ObjectId(req.query.user_id);

        const habits = await Habit.findHabits(Owner);
        res.status(200).json(habits);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const createHabit = async (req, res) => {
    
    const {Owner, Title, MeasurementType, Goal} = req.body;
    try {
        const user_id = new ObjectId(Owner);
        const habit = await Habit.createHabit(user_id, Title, MeasurementType, Goal);
        res.status(200).json(habit);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const updateHabit = async (req, res) => {
    const { HabitID, UserID, ...updateData } = req.body;
    try {
        const habit_id = new ObjectId(HabitID);
        const user_id = new ObjectId(UserID);
        const habit = await Habit.updateHabit(habit_id, user_id, updateData);
        res.status(200).json(habit);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

//delete a habit
const deleteHabit = async (req, res) => {
    const { user_id, habit_id } = req.query;
    try {
        //convert user_id and habit_id to ObjectId
        const User_id = new ObjectId(user_id);
        const Habit_id = new ObjectId(habit_id);

        //get the habit by its ID
        const habit = await Habit.findById(Habit_id);

        //check if the habit is a group habit
        if (habit.GroupHabitID) {
            //get the group habit
            const groupHabit = await GroupHabit.findById(habit.GroupHabitID);

            if (groupHabit.Owner.equals(User_id)) {
                //delete the habit for everyone who has the group habit ID
                await Habit.massDelete(habit.GroupHabitID);

                //delete the record of the group habit
                await GroupHabit.deleteGroupHabit(habit.GroupHabitID);
            } else {
                //remove the user from the group habit arrays
                await GroupHabit.removeUser(user_id, habit.GroupHabitID);

                //delete the habit for the user
                await Habit.deleteHabit(Habit_id, User_id);
            }
        } else {
            //delete the habit for the user
            await Habit.deleteHabit(Habit_id, User_id);
        }

        res.status(200).json({ message: 'Habit deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getHabitsCompletedOnDate = async (req, res) => {
    const {user_id, date} = req.query;
    try {
        const User_id = new ObjectId(user_id);
        const thisDate = new Date(date);
        const habits = await Habit.getCompletedHabitsForDate(User_id, thisDate);
        res.status(200).json(habits);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {getHabits, createHabit, updateHabit, deleteHabit, getHabitsCompletedOnDate}