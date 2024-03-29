const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    EmailOptIn: {
        type: Boolean,
        required: true
    },
    ProfilePublic: {
        type: Bollean,
        required: true
    },
    User:{
        type: mongoose.ObjectId,
        required: true
    }
}, { collection: 'PrivacySettings'});