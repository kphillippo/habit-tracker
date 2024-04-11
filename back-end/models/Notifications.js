const mongoose = require('mongoose');

const NotificationsSchema = new mongoose.Schema({
    User:{
        type: mongoose.ObjectId,
        required: true
    },
    Date:{
        type: Date
    },
    Title:{ //types: Friend Request, You have been unfriended, Friend Request Declined, Friend Request Accepted, To do notification, Habit notification
        type: String,
        required: true
    },
    Message:{
        type: String,
        required: true
    },
    Viewed:{
        type: Boolean,
        default: false,
        required: true
    },
}, {collection: 'Notifications'});

//finds all notifications requests to a particualr user
NotificationsSchema.statics.findNotifications = async function(User) {

    //get notifications of with title todo and habbit
    const habits = { User: User, Name: "You Have Habits to do today!", Viewed: false };
    const todos = { User: User, Name: "You Have ToDos to do today!", Viewed: false };

    //updates the todo and habit notifications to be viewed after checking notifiations
    const update = { $set: { Viewed: true} };
    await this.updateMany(habits, update);
    await this.updateMany(todos, update);

    //gets all notifications
    return await this.find({ User: User });
}

//return the number of notifications
NotificationsSchema.statics.findNumNotifications = async function(User) {

    //gets all notifications
    const notifications = { User: User };

    return await this.countDocuments(notifications);
}

//sends a notification to a user
NotificationsSchema.statics.sendNotification = async function(User, title, message) {

    return await this.create({User: User, Title: title, Message: message});
}

//removes a notification record
NotificationsSchema.statics.deleteNotification = async function(_id) {

    const existingRecord = await this.findOneAndDelete({ _id: _id });
}

//looks for a record that matches the title for a user
NotificationsSchema.statics.lookForRecord = async function(UserId, title) {

    const existingRecord = await this.countDocuments({ User: UserId, Title: title});

    return existingRecord;
}

//updates a record
NotificationsSchema.statics.updateNotification = async function(UserId, title, message) {

    const existingRecord = await this.findOne({ User: UserId, Title: title});

    existingRecord.Message = message;
    await existingRecord.save();

    return existingRecord;
}

const NotificationsModel = mongoose.model("Notifications", NotificationsSchema);
module.exports = NotificationsModel;