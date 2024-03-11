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
    },
    ProfilePicture:
    {
        data: Buffer,
        contentType: String
    }
    
}, { collection: 'User'});

//static delete user function- later more will need to be added since all the settings and friends of the user will also need to be deleted if we will even use this for anythig other then testing
UserSchema.statics.delete = async function(Username){
    // Check if the user exists
  const user = await this.findOne({ Username });

  // If the user exists, delete it
  if (user) {
    await this.findOneAndDelete({ Username });
    return { success: true, message: 'User deleted successfully!' };
  }
}

//static sign up function
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

// static login method
UserSchema.statics.login = async function(Username, Password){

    //checks if all fields are filled
    if ((!Username || !Password)){
        throw Error('All fields must be filled!')
    }

    //gets the user assosiated to the username
    const user = await this.findOne({Username});

    if(!user){
        throw Error('That user does not exist!')
    }

    //chekcs if the password matches the username
    const match = await bcrypt.compare(Password, user.Password)

    if(!match){
        throw Error('Incorrect Password!')
    }

    return user
}

//statuc get profile info function
UserSchema.statics.getUserProfileInfo = async function(_id){
    const user = await this.findOne({_id: _id});

    return user
}

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;