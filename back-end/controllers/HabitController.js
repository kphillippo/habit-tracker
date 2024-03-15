const Habit = require('../models/Habit');
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

const deleteHabit = async (req, res) => {
    const {user_id, habit_id} = req.query;
    try {
        const Habit_id = new ObjectId(habit_id);
        const User_id = new ObjectId(user_id);
        const habit = await Habit.deleteHabit(Habit_id, User_id);
        res.status(200).json(habit);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {getHabits, createHabit, updateHabit, deleteHabit}