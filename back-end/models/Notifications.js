const mongoose = require('mongoose');

const NotificationsSchema = new mongoose.Schema({
    User_ID:{
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

    //gets all notifications before updating
    const notifications = { User: User };

    //get notifications of with title todo and habbit
    const habits = { User: User, Name: "You Have Habits to do today!", Viewed: false };
    const todos = { User: User, Name: "You Have ToDos to do today!", Viewed: false };

    //updates the todo and habit notifications to be viewed after checking notifiations
    const update = { $set: { Viewed: viewedValue} };
    await this.updateMany(habits, update);
    await this.updateMany(todos, update);

    return await this.find(notifications);
}

//return the number of notifications
NotificationsSchema.statics.findNotifications = async function(User) {

    //gets all notifications
    const notifications = { User: User };

    return await this.countDocuments(notifications);
}

//sends a notification to a user
NotificationsSchema.statics.sendNotification = async function(User, FriendsWith, title, message) {

    const request = await this.create({User: User, FriendsWith: FriendsWith, Title: title, Message: message});

    return await this.countDocuments(notifications);
}

//removes a notification record
NotificationsSchema.statics.deleteNotification = async function(_id) {

    //deletes the records
    const existingRecord = await this.findOneAndDelete({ _id: _id });
}



const NotificationsModel = mongoose.model("Notifications", NotificationsSchema);
module.exports = NotificationsModel;