const mongoose = require('mongoose');

const NotificationsSchema = new mongoose.Schema({
    User_ID:{
        type: mongoose.ObjectId,
        required: true
    },
    Date:{
        type: Date,
        required: true
    },
    Type:{
        type: String,
        required: true
    },
    Data:{
        type: String,
        required: true
    },
    Viewed:{
        type: Boolean,
        default: true
    }
}, {collection: 'Notifications'});

module.exports = mongoose.model('Notifications', NotificationsSchema);