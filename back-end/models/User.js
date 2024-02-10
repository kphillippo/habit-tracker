const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true,
        unique: true
    },
    Username:{
        type: String,
        required: true,
        unique: true
    },
    Password:{
        type: String,
        required: true
    },
    Streak:{
        type: int
    }
}, { collection: 'User'});

// static signup method, hashes and adds salt to password to protect it
//http://localhost:8081/api/user/signup to try it out
UserSchema.statics.signup = async function(FirstName, LastName, Email, Username, Password) {

    const exists = await this.findOne({Username});

    if(exists){
        throw Error('Username already in use!')
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(Password, salt);

    const user = await this.create({FirstName, LastName, Email, Username, Password: hash});

    return user;

}

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;