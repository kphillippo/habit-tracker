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

const getToDos = async (req, res) => {
    try {
        let { user_id } = req.query;
        const UserId = new ObjectId(user_id);
        let owner = await User.findById(UserId);
        if (!owner) {
            throw new Error("User not found");
        }
        const todos = await ToDo.find({ Owner: UserId  });
        res.status(200).json(todos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateToDo = async (req, res) => {
    try {
        let { ToDoId, UserId, ...data } = req.body;
        ToDoId = new ObjectId(ToDoId);
        UserId = new ObjectId(UserId);
        if (!await User.findById(UserId)) {
            throw new Error("User not found");
        }
        if (!await ToDo.findById(ToDoId)) {
            throw new Error("ToDo not found");
        }
        if (!await ToDo.find({ _id: ToDoId, Owner: UserId })) {
            throw new Error("You do not own this ToDo");
        }
        const tempToDo = await ToDo.findOneAndUpdate({ _id: ToDoId, Owner: UserId }, { $set: data }, { new: true });
        if (tempToDo) {
            return res.status(200).json(tempToDo);
        }
        throw new Error("ToDo could not be updated.");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteToDo = async (req, res) => {
    try {
        let { user_id, todo_id } = req.query;
        const UserId = new ObjectId(user_id);
        const ToDoId = new ObjectId(todo_id);
        const tempToDo = await ToDo.findOneAndDelete({ _id: ToDoId, Owner: UserId });
        if (!tempToDo) {
            throw new Error("ToDo not found");
        }
        return res.status(200).send({message: tempToDo.message});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { createToDo, getToDos, updateToDo, deleteToDo }