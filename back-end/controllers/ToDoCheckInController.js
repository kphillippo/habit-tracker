const ToDoCheckIn = require('../models/ToDoCheckIn');
const ToDo = require('../models/ToDo');

//controller functions go here
const getCheckIns = async (req, res) => {
    const todo_id = req.query.todo_id;
    try {
        const checkIns = await ToDoCheckIn.find({ToDoID: todo_id});
        res.status(200).json(checkIns);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const updateCheckIn = async (req, res) => {
    const ToDoID = req.body.ToDoID;
    const status = req.body.Status;

    try {
        let checkIn = await ToDoCheckIn.findOne({ToDoID: ToDoID, CheckInTime: {$gte: new Date(new Date().setUTCHours(0,0,0,0)), $lt: (new Date().setUTCHours(23,59,59,999))}});
        if (!checkIn) {
            checkIn = await ToDoCheckIn.create({ToDoID, Status: status, CheckInTime: new Date().toISOString()});
        } else {
            checkIn.Status = status;
            checkIn.CheckInTime = new Date().toISOString();
            await checkIn.save();
        }
        res.status(200).json(checkIn);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getTodayStatus = async (req, res) => {
    const ToDoID = req.query.todo_id;
    try {
        let result = false;
        const checkIn = await ToDoCheckIn.findOne({ToDoID: ToDoID, CheckInTime: {$gte: new Date(new Date().setUTCHours(0,0,0,0)), $lt: (new Date().setUTCHours(23,59,59,999))}}, {},{sort: {CheckInTime: desc}});
        if (!checkIn) {
            result = false;
        } else {
            result = checkIn.Status;
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = { getCheckIns, updateCheckIn , getTodayStatus};