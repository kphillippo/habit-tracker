const mongoose = require('mongoose');

const FriendsSchema = new mongoose.Schema({
    User:{
        type: mongoose.ObjectId,
        required: true
    },
    FriendsWith:{
        type: mongoose.ObjectId,
        required: true
    }
}, { collection: 'Friends'});

FriendsSchema.statics.findFriends = async function(User) {
    return await this.find({User: User});
}

const FriendsModel = mongoose.model("Friends", FriendsSchema);
module.exports = FriendsModel;