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
    const {Owner, Title, PrivacyType, MeasurementType, Goal} = req.body;
    try {
        const user_id = new ObjectId(Owner);
        const habit = await Habit.createHabit(user_id, Title, PrivacyType, MeasurementType, Goal);
        res.status(200).json(habit);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const updateHabit = async (req, res) => {
    const {HabitID, UserID, data} = req.body;
    try {
        const habit_id = new ObjectId(HabitID);
        const user_id = new ObjectId(UserID);
        const habit = await Habit.updateHabit(habit_id, user_id, data);
        res.status(200).json(habit);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const deleteHabit = async (req, res) => {
    const {HabitID, UserID} = req.body;
    try {
        const habit_id = new ObjectId(HabitID);
        const user_id = new ObjectId(UserID);
        const habit = await Habit.deleteHabit(habit_id, user_id);
        res.status(200).json(habit);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {getHabits, createHabit, updateHabit, deleteHabit}