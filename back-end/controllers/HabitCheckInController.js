const HabitCheckIn = require('../models/HabitCheckIn');
const ObjectId = require('mongoose').Types.ObjectId;
const Habit = require('../models/Habit');

//controller functions go here
/**
 * Updates or creates a new habit check-in.
 * @async
 * @function UpdateHabitCheckIn
 * @param {Object} req.body - The request body.
 * @param {string} req.body.HabitID - The ID of the habit.
 * @param {number} req.body.Count - The count of the habit check-in.
 * @returns {Promise<void>} - Sends a response containing the check-in json or error message.
 */
const UpdateHabitCheckIn = async (req, res) => {
    const {HabitID, Count} = req.body;
    let Parent = HabitID;
    Parent = new ObjectId(Parent);
    console.log(Parent)
    try {
        const habit = await Habit.findOne({_id: Parent});
        if (!habit) {
            throw new Error('Habit doesn\'t exist!');
        }
        let habitCheckIn = await HabitCheckIn.findOne({
            HabitID: Parent,
            CheckInDate: {
                $gte: new Date().setUTCHours(0,0,0,0),
                $lt: new Date().setUTCHours(23,59,59,999)
            }
        });
        if (!habitCheckIn) {
            habitCheckIn = await HabitCheckIn.create({HabitID: Parent, Count, CheckInTime: new Date().toISOString()});
        } else {
            habitCheckIn.Count = Count;
            habitCheckIn.CheckInDate = new Date().toISOString();
            await habitCheckIn.save();
        }
        res.status(200).json(habitCheckIn);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({error: error.message});
    }
}

/**
 * Gets all check-ins for a habit.
 * @async
 * @function GetHabitCheckIns
 * @param {Object} req.query - The request query.
 * @param {string} req.query.habit_id - The ID of the habit.
 * @returns {Promise<void>} - Sends a response containing check-in json or error message.
 */
const GetHabitCheckIns = async (req, res) => {
    console.log(req.query)
    let Parent = req.query.habit_id;
    console.log(`Parent: ${Parent}`)
    try {
        const habit = await Habit.findOne({_id: Parent});
        console.log(habit);
        if (!habit) {
            throw new Error('Habit doesn\'t exist!');
        }
        const habitCheckIns = await HabitCheckIn.find({HabitID: Parent});
        console.log(`HabitID: ${Parent}`);
        console.log(`Found check-ins: ${habitCheckIns.length}`);
        if (!habitCheckIns || habitCheckIns.length === 0) {
            throw new Error('No check-ins for this habit!');
        }
        res.status(200).json(habitCheckIns);
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error: error.message});
    }
}

/**
 * Gets a habit check-in by date.
 * @async
 * @function GetCheckInByDate
 * @param {Object} req.query - The request query.
 * @param {string} req.query.habit_id - The ID of the habit.
 * @param {string} req.query.date - The date of the check-in.
 * @returns {Promise<void>} - Sends a response containing check-in's matching that date, or an error message.
 */
const GetCheckInByDate = async (req, res) => {
    let Parent = req.query.habit_id;
    let Date = req.query.date;
    Parent = new ObjectId(Parent);
    try {
        let habit = Habit.findOne({_id: Parent});
        if (!habit) {
            throw new Error('Habit doesn\'t exist!');
        }
        let habitCheckIns = await HabitCheckIn.findForDate(Parent, Date);
        return res.status(200).json(habitCheckIns);
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error: error.message});
    }
}

module.exports = { UpdateHabitCheckIn, GetHabitCheckIns, GetCheckInByDate };