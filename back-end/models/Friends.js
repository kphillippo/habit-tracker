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
    }
}, { collection: 'Friends'});


//finds friends who are in the table whos request pending status is false
FriendsSchema.statics.findFriends = async function(User, RequestPending) {
    return await this.find({ User: User, RequestPending: false });
}

//static send friend request function
FriendsSchema.statics.sendFriendRequest = async function(User, FriendsWith) {

    //checks if they are already friends
    const existingRecord = await this.findOne({ User: User, FriendsWith: FriendsWith, RequestPending: false});

    if(existingRecord){
        throw Error('You are already friends with this user!')
    }

    //checks if there is already a freind request sent by the Requester
    const existingRecord2 = await this.findOne({ User: User, FriendsWith: FriendsWith, RequestPending: true, Requester: User});

    if(existingRecord){
        throw Error('You have already sent a friend request to this user!')
    }

    //checks if there is already a freind request sent by the Requestee
    const existingRecord3 = await this.findOne({ User: User, FriendsWith: FriendsWith, RequestPending: true, Requester: FriendsWith});

    if(existingRecord){
        throw Error('You have a freind request from this user already!')
    }

    //checks if the user is trying to friend themself

    if(User == FriendsWith){
        throw Error('You cannot friend yourself!')
    }

    const request = await this.create({User: User, FriendsWith: FriendsWith, RequestPending: true, Requester: User});
    const request2 = await this.create({User: FriendsWith, FriendsWith: User, RequestPending: true, Requester: User});

    return request, request2;
}

//static decline friend request function
FriendsSchema.statics.declineFriendRequest = async function(User, FriendsWith) {
    
}

const FriendsModel = mongoose.model("Friends", FriendsSchema);
module.exports = FriendsModel;