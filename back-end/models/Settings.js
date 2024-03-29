const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    User:{
        type: mongoose.ObjectId,
        required: true
    },
    DisplayProfileToFriends:{ 
        type: Boolean,
    },
    DisplayName:{
        type: Boolean,
    },
    DisplayEmail:{
        type: Boolean,
    },
    DisplayPhoto:{
        type: Boolean,
    },
    DisplayStreaks:{
        type: Boolean,
    },
    DisplayStats:{
        type: Boolean,
    },
    AllowEmails:{
        type: Boolean,
    },
    HabitEmails:{
        type: Boolean,
    },
    ToDoEmails:{
        type: Boolean,
    },
    FrindRequestEmails:{
        type: Boolean,
    },
    GroupChallangeEmails:{
        type: Boolean,
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
     await this.create({User, DisplayProfileToFriends: false, DisplayName:false, DisplayEmail: false, DisplayPhoto: false, DisplayStreaks: false, DisplayStats: false, AllowEmails: true, HabitEmails: true, ToDoEmails: true, FrindRequestEmails: true, GroupChallangeEmails: true, MainColor: 0, FontSize: 1});
}

//gets a user's settings
SettingsSchema.statics.getSettings = async function(User) {
    return await this.findOne({User: User});
}

//sets a user's settings
SettingsSchema.statics.setSettings = async function(User, DisplayProfileToFriends, DisplayName, DisplayEmail, DisplayPhoto, DisplayStreaks, DisplayStats, AllowEmails, HabitEmails, ToDoEmails, FrindRequestEmails, GroupChallangeEmails, MainColor, FontSize) {
    //ensures the user has settings
    const user = await this.findOne({User});
    
    const updatedFields = {DisplayProfileToFriends, DisplayName, DisplayEmail, DisplayPhoto, DisplayStreaks, DisplayStats, AllowEmails, HabitEmails, ToDoEmails, FrindRequestEmails, GroupChallangeEmails, MainColor, FontSize};

    await this.findByIdAndUpdate(user._id, { $set: updatedFields }, { new: true });
}

const SettingsModel = mongoose.model("Settings", SettingsSchema);
module.exports = SettingsModel;