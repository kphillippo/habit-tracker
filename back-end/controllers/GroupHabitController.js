const GroupHabit = require('../models/GroupHabit');
const Habit = require('../models/Habit');
const ObjectId = require('mongoose').Types.ObjectId;


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

const returnGroupHabits = async (req, res) => {
    const {User, Title, MeasurementType, Goal} = req.body;
    try {
        const habit = await GroupHabit.editHabit(user_id, Title, MeasurementType, Goal);

    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

//edits a group habit
const editGroupHabit = async (req, res) => {
    const {GroupHabitID, Title, MeasurementType, Goal} = req.body;
    try {
        //updates habit
        const habit = await GroupHabit.editHabit(GroupHabitID, Title, MeasurementType, Goal);

        res.status(200).json(habit);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = { createGroupHabit, editGroupHabit }