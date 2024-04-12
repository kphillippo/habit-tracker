const ObjectId = require('mongoose').Types.ObjectId;
const Habit = require('../models/Habit');
const HabitCheckIn = require('../models/HabitCheckIn');
const User = require('../models/User');

const habitsCompletedLast30Days = async (req, res) => {
    //get list of habits
    try {
        const userId = req.query.user_id;
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const habits = await Habit.find({Owner: userId});
        const habitIds = habits.map(habit => habit._id);

        //get check ins for each habit for the last 30 days
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        const thirtyDaysAgo = new Date().setDate(today.getDate() - 30);
        thirtyDaysAgo.setHours(0, 0, 0, 0);
        const checkIns = await HabitCheckIn.find({
            HabitID: {$in: habitIds},
            CheckInTime: {
                $gte: thirtyDaysAgo,
                $lt: today
            }
        });

        //check if the check in is completed
        const completedCheckIns = checkIns.filter(checkIn => checkIn.Count === habit.Goal);
        const completionsByDay = new Map();
        completedCheckIns.forEach(checkIn => {
            const date = checkIn.CheckInTime.toDateString();
            if (completionsByDay.has(date)) {
                completionsByDay.set(date, completionsByDay.get(date) + 1);
            } else {
                completionsByDay.set(date, 1);
            }
        });

        //return the count of completed habits
        res.status(200).json(Object.fromEntries(completionsByDay));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const todosCompletedLast30Days = async (req, res) => {
    //get list of todos
    //get check ins for each item for the last 30 days
    //check if the check in is completed
    //return the count of completed todos
}

const timesHabitCompletedLast30Days = async (req, res) => {
    //get habit
    //get check ins for habit for the last 30 days
    //return the number of completed days / 30
}

const timesToDoCompletedLast30Days = async (req, res) => {
    //get todo
    //get check ins for todo for the last 30 days
    //return the number of completed days / 30
}