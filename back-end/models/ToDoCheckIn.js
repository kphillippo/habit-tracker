const mongoose = require('mongoose');

const ToDoCheckInSchema = new mongoose.Schema({
    ToDoID:{
        type: mongoose.ObjectId,
        required: true
    },
    Status:{
        type: Boolean,
        required: true
    },
    CheckInTime: {
        type: Date,
        required: true
    }
}, { collection: 'ToDoCheckIn'});

module.exports = mongoose.model('ToDoCheckIn', ToDoCheckInSchema);