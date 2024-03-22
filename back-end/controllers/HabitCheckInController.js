const HabitCheckIn = require('../models/HabitCheckIn');
const ObjectId = require('mongoose').Types.ObjectId;
const Habit = require('../models/Habit');

//controller functions go here
const UpdateHabitCheckIn = async (req, res) => {
    const {HabitID, Count} = req.body;
    let Parent = HabitID;
    Parent = new ObjectId(Parent);
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

module.exports = { UpdateHabitCheckIn, GetHabitCheckIns };