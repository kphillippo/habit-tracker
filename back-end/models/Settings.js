const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    User:{
        type: mongoose.ObjectId,
        required: true
    },
    DisplayProfileToFriends:{ 
        type: Boolean,
        default: false,
    },
    DisplayName:{
        type: Boolean,
        default: false,
    },
    DisplayEmail:{
        type: Boolean,
        default: false,
    },
    DisplayPhoto:{
        type: Boolean,
        default: false,
    },
    DisplayStreaks:{
        type: Boolean,
        default: false,
    },
    DisplayStats:{
        type: Boolean,
        default: false,
    },
    AllowEmails:{
        type: Boolean,
        default: false,
    },
    HabitEmails:{
        type: Boolean,
        default: false,
    },
    ToDoEmails:{
        type: Boolean,
        default: false,
    },
    FriendRequestEmails:{
        type: Boolean,
        default: false,
    },
    GroupChallangeEmails:{
        type: Boolean,
        default: false,
    },
    MainColor:{ //0 = green, 1 = blue, 2 = pink
        type: Number,
    },
    FontSize:{ //0 = Small, 1 = Medium, 2 = Large
        type: Number,
    }
}, { collection: 'Settings'});

//sets the settings for the user when they first sign up
SettingsSchema.statics.onSignupSettings = async function(User) {
     await this.create({User, DisplayProfileToFriends: false, DisplayName:false, DisplayEmail: false, DisplayPhoto: false, DisplayStreaks: false, DisplayStats: false, AllowEmails: true, HabitEmails: true, ToDoEmails: true, FriendRequestEmails: true, GroupChallangeEmails: true, MainColor: 0, FontSize: 1});
}

//gets a user's settings
SettingsSchema.statics.getSettings = async function(User) {
    return await this.findOne({User: User});
}

//sets a user's settings
SettingsSchema.statics.setSettings = async function(User, DisplayProfileToFriends, DisplayName, DisplayEmail, DisplayPhoto, DisplayStreaks, DisplayStats, AllowEmails, HabitEmails, ToDoEmails, FriendRequestEmails, GroupChallangeEmails, MainColor, FontSize) {
    //ensures the user has settings
    const user = await this.findOne({User});
    
    const updatedFields = {DisplayProfileToFriends, DisplayName, DisplayEmail, DisplayPhoto, DisplayStreaks, DisplayStats, AllowEmails, HabitEmails, ToDoEmails, FriendRequestEmails, GroupChallangeEmails, MainColor, FontSize};

    await this.findByIdAndUpdate(user._id, { $set: updatedFields }, { new: true });
}

const SettingsModel = mongoose.model("Settings", SettingsSchema);
module.exports = SettingsModel;