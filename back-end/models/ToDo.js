const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema({
    Owner:{
        type: mongoose.ObjectId,
        required: true
    },
    Title:{
        type: String,
        required: true
    },
    Date:{
        type: Date,
        required: true
    },
    Repeat:{
        type: Boolean,
        required: true
    },
    Remind:{
        type: Boolean,
        required: true
    },
    Status:{
        type: Boolean,
        default: false
    }
}, {collection: 'ToDo'});

module.exports = mongoose.model('ToDo', ToDoSchema);