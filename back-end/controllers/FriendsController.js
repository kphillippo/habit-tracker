const Friend = require('../models/Friends');
const UserModel = require('../models/User');

//send friend request
const sendFriendRequest = async (req, res) => {
    const {User, FriendsWith} = req.body
  
    try{
        //trys to send friend request
        const request = await Friend.sendFriendRequest(User, FriendsWith)
    
        res.status(200).json(request)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//returns friends list
const returnFriendsList = async (req, res) => {
    const {User} = req.body

    //returns friends list
    const request = await Friend.findFriends(User);

    res.status(200).json(request)
}

//returns friend requests
const returnFriendRequests = async (req, res) => {
    const {User} = req.body
    //returns friends list
    const request = await Friend.findFriendRequests(User);

    res.status(200).json(request)
}

//accepts a friend request
const acceptFriendRequest = async (req, res) => {
    const {User, FriendsWith} = req.body
  
    //returns friends list
    const request = await Friend.acceptFriendRequest(User, FriendsWith);

    res.status(200).json("Friend Request Accepted!")
}

//declines a friend request
const declineFriendRequest = async (req, res) => {
    const {User, FriendsWith} = req.body
  
    //returns friends list
    const request = await Friend.deleteFriendRecord(User, FriendsWith);

    res.status(200).json("Friend Request Declined!")
}

//declines a friend request
const deleteFriend = async (req, res) => {
    const {User, FriendsWith} = req.body
  
    //returns friends list
    const request = await Friend.deleteFriendRecord(User, FriendsWith);

    res.status(200).json("Friend Removed From Freinds List!")
}

module.exports = {sendFriendRequest, returnFriendsList, returnFriendRequests, acceptFriendRequest, declineFriendRequest, deleteFriend}