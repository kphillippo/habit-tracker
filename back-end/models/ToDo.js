const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    User:{
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
    Time:{
        type: Date,
        required: true
    },
    Repeat:{
        type: String,
        required: true
    },
    Remind:{
        type: String,
        required: true
    },
    Status:{
        type: Boolean,
        required: true
    }
}, {collection: 'ToDo'});