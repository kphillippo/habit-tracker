const mongoose = require('mongoose');

const ToDoCheckInSchema = new mongoose.Schema({
    ToDoID:{
        type: mongoose.ObjectId,
        required: true
    },
    Count:{
        type: Number,
        required: true,
        default: 0
    }
}, { collection: 'ToDoCheckIn'});