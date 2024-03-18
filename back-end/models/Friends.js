const mongoose = require('mongoose');

const FriendsSchema = new mongoose.Schema({
    User:{
        type: mongoose.ObjectId,
        required: true
    },
    FriendsWith:{
        type: mongoose.ObjectId,
        required: true
    },
    RequestPending:{ //false = friends, true = pending request
        type: Boolean,
        required: true
    },
    Requester:{//the id of the one sending the request
        type: mongoose.ObjectId
    },
    Requestee:{//the id of the one recieving the request
        type: mongoose.ObjectId
    }
}, { collection: 'Friends'});

//deletes a friend record (used for declineing a friend request and for deleting a friend)
FriendsSchema.statics.deleteFriendRecord = async function(User, FriendsWith) {

    //deletes the records
    const existingRecord = await this.findOneAndDelete({ User: User, FriendsWith: FriendsWith });
    const existingRecord2 = await this.findOneAndDelete({ User: FriendsWith, FriendsWith: User});

    return existingRecord, existingRecord2;
}

//accepts a friend request
FriendsSchema.statics.acceptFriendRequest = async function(User, FriendsWith) {

    //finds and updates the requestPending field for both records
    const existingRecord = await this.findOneAndUpdate({ User: User, FriendsWith: FriendsWith }, { RequestPending: false });
    const existingRecord2 = await this.findOneAndUpdate({ User: FriendsWith, FriendsWith: User}, { RequestPending: false });

    return existingRecord, existingRecord2;
}

//finds all friend requests to a particualr user
FriendsSchema.statics.findFriendRequests = async function(User) {
    return await this.find({ User: User, RequestPending: true, Requestee: User });
}

//finds friends who are in the table whos request pending status is false
FriendsSchema.statics.findFriends = async function(User) {
    return await this.find({ User: User, RequestPending: false });
}

//finds friends and adds user and sorts by streak for leaderboard
FriendsSchema.statics.findLeaderboard = async function(User) {
    return await this.find({ User: User, RequestPending: false });
}

//static send friend request function
FriendsSchema.statics.sendFriendRequest = async function(User, FriendsWith) {

    //checks if they are already friends
    const existingRecord = await this.findOne({ User: User, FriendsWith: FriendsWith, RequestPending: false});

    if(existingRecord){
        throw Error('You are already friends with this user!')
    }

    //checks if there is already a friend request sent by the Requester
    const existingRecord2 = await this.findOne({ User: User, FriendsWith: FriendsWith, RequestPending: true, Requester: User});

    if(existingRecord2){
        throw Error('You have already sent a friend request to this user!')
    }

    //checks if there is already a friend request sent by the Requestee
    const existingRecord3 = await this.findOne({ User: User, FriendsWith: FriendsWith, RequestPending: true, Requester: FriendsWith});

    if(existingRecord3){
        throw Error('You have a friend request from this user already!')
    }

    //checks if the user is trying to friend themself

    if(User == FriendsWith){
        throw Error('You cannot friend yourself!')
    }

    const request = await this.create({User: User, FriendsWith: FriendsWith, RequestPending: true, Requester: User, Requestee: FriendsWith});
    const request2 = await this.create({User: FriendsWith, FriendsWith: User, RequestPending: true, Requester: User, Requestee: FriendsWith});

    return request, request2;
}

const FriendsModel = mongoose.model("Friends", FriendsSchema);
module.exports = FriendsModel;