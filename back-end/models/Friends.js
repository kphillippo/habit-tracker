const mongoose = require('mongoose');

const FriendsSchema = new mongoose.Schema({
    User:{
        type: mongoose.ObjectId,
        required: true
    },
    FriendsWith:{
        type: mongoose.ObjectId,
        required: true
    }
}, { collection: 'Friends'});