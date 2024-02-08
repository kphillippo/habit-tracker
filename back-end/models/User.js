const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    age:{
        type: Number
    },
    username:{
        type: String
    }
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;