const Habit = require('../models/Habit');
const getHabits = async (req, res) => {
    try {
        const ObjectId = require('mongoose').Types.ObjectId;
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
        const habit = await Habit.createHabit(Owner, Title, PrivacyType, MeasurementType, Goal);
        res.status(200).json(habit);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {getHabits, createHabit}