const Friend = require('../models/Friends');
const UserModel = require('../models/User');
const ObjectId = require('mongoose').Types.ObjectId;

//send friend request
const sendFriendRequest = async (req, res) => {
    try{
        const {User, FriendsWith} = req.body
  
        //takes the username and returns an _id for the friend
        FriendsWithUsername = await UserModel.getUserId(FriendsWith);

        //trys to send friend request
        const request = await Friend.sendFriendRequest(User, FriendsWithUsername)
    
        res.status(200).json(request)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//returns friends list
const returnFriendsList = async (req, res) => {
    try{
        const {User} = req.body

        //returns friends list
        const request = await Friend.findFriends(User);

        res.status(200).json(request)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//returns leaderboard
const returnLeaderBoard = async (req, res) => {
    try{
        const {User} = req.body

        // Retrieve user information
        const userInfo = await UserModel.getUserProfileInfo(User);

        // Retrieve friends of the user
        const userFriends = await Friend.findFriends(User);

        // Extract the _id of each friend
        const friendIds = userFriends.map(friend => friend.FriendsWith);

        // Retrieve the username and Streak of each friend based on their _id
        const friendData = await UserModel.aggregate([
            { $match: { _id: { $in: friendIds } } },
            { $project: { _id: 1, Username: 1, Streak: 1 } }
        ]);

        // Map friend data to friend objects
        const populatedFriends = userFriends.map(friend => {
            const friendInfo = friendData.find(data => data._id.toString() === friend.FriendsWith.toString());
            // Exclude specified fields
            const { _id, User, RequestPending, Requester, Requestee, ...rest } = friend.toObject();
            return {
                Username: friendInfo.Username,
                Streak: friendInfo.Streak
            };
        });

        // Add current user information to the populatedFriends array
        populatedFriends.unshift({
            username: userInfo.Username,
            Streak: userInfo.Streak
            // Add other fields of the current user if needed
        });

        // Sort the populatedFriends array by streak (descending order)
        populatedFriends.sort((a, b) => b.Streak - a.Streak);

        res.status(200).json(populatedFriends)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//returns friend requests
const returnFriendRequests = async (req, res) => {
    try{
        const {User} = req.body
        //returns friends list
        const request = await Friend.findFriendRequests(User);

        res.status(200).json(request)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//accepts a friend request
const acceptFriendRequest = async (req, res) => {
    try{
        const {User, FriendsWith} = req.body
    
        //returns friends list
        const request = await Friend.acceptFriendRequest(User, FriendsWith);

        res.status(200).json("Friend Request Accepted!")
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//declines a friend request
const declineFriendRequest = async (req, res) => {
    try{
        const {User, FriendsWith} = req.body
    
        //returns friends list
        const request = await Friend.deleteFriendRecord(User, FriendsWith);

        res.status(200).json("Friend Request Declined!")
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//declines a friend request
const deleteFriend = async (req, res) => {
    try{
        const {User, FriendsWith} = req.body
    
        const User_id = new ObjectId(User);
        const Friend_id = new ObjectId(FriendsWith);

        //returns friends list
        const request = await Friend.deleteFriendRecord(User_id, Friend_id);

        res.status(200).json("Friend Removed From Friends List!")
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {sendFriendRequest, returnFriendsList, returnFriendRequests, acceptFriendRequest, declineFriendRequest, deleteFriend, returnLeaderBoard}