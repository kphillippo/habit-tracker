const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator')

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
        type: Number,
        default: 0
    }, 
    PrivacySettings:{
        type: mongoose.ObjectId
    }
    
}, { collection: 'User'});

/* static signup method
http://localhost:8081/api/user/signup to try it out
jason format for testing: 
{
  "FirstName": "Lysa",
  "LastName": "Hannes",
  "Email": "Test@gmail.com",
  "Username": "CristalKitty",
  "Password": "Password!1"
}
*/
UserSchema.statics.signup = async function(FirstName, LastName, Email, Username, Password) {


    //validation
    if (!FirstName || !LastName || !Email || !Username || !Password){
        throw Error('All fields must be filled!')
    }

    if(!validator.isEmail(Email)){
        throw Error('Email is not valid!')
    }

    if(!validator.isStrongPassword(Password)){
        throw Error('Password must contain a capital, a lowercase, a symbol and 8 characters total!')
    }


    //checks if username is already in use
    const existsUsername = await this.findOne({Username});

    if(existsUsername){
        throw Error('Username already in use!')
    }

    //checks if email is already in use
    const existsEmail = await this.findOne({Email});

    if(existsEmail){
        throw Error('Email already in use!')
    }

    //encrypts password with salt, then hashes
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(Password, salt);

    const user = await this.create({FirstName, LastName, Email, Username, Password: hash});


    return user;

}

/* static login method
http://localhost:8081/api/user/login to try it out
jason format for testing: 
{
  "Username": "CristalKitty",
  "Password": "Password!1"
}
*/
UserSchema.statics.login = async function(Username, Password){

    //checks if all fields are filled
    if ((!Username || !Password)){
        throw Error('All fields must be filled!')
    }

    //checks is the username is assosiated with a user
    const user = await this.findOne({Username});

    if(!user){
        throw Error('That user does not exist!')
    }

    //chekcs if the password matches the username
    const match = await bcrypt.compare(Password, user.Password)

    if(!match){
        throw Error('Incorrect Password')
    }

    return user
}

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;