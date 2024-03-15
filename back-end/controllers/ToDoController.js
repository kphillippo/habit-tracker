const ToDo = require('../models/ToDo');
const ObjectId = require('mongoose').Types.ObjectId;
const User = require('../models/User');

//controller functions go here
const createToDo = async (req, res) => {
    try {
        let { Owner, Title, Date, Repeat, Remind } = req.body;
        Owner = new ObjectId(Owner);
        if (!await User.findById(Owner)) {
            throw new Error("User not found");
        }
        const newToDo = await ToDo.create({Owner: Owner, Title: Title, Date: Date, Repeat: Repeat, Remind: Remind});
        res.status(200).json(newToDo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getTodos = async (req, res) => {
    try {
        let { UserId } = req.query;
        UserId = new ObjectId(UserId);
        let owner = await User.findById(UserId);
        if (!owner) {
            throw new Error("User not found");
        }
        const todos = await ToDo.find({ Owner: UserId });
        res.status(200).json(todos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteToDo = async (req, res) => {
    try {
        let { UserId, ToDoId } = req.body;
        UserId = new ObjectId(UserId);
        ToDoId = new ObjectId(ToDoId);
        const tempToDo = await ToDo.findOneAndDelete({ _id: ToDoId, Owner: UserId });
        if (tempToDo) {
            return res.status(200).send({message: tempToDo.message});
        }
        throw new Error("ToDo not found");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { createToDo, getTodos, deleteToDo }