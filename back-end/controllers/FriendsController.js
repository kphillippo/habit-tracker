const Friend = require('../models/Friends');
const UserModel = require('../models/User');
const NotificationsModel = require('../models/Notifications');
const SettingsModel = require('../models/Settings');
const ObjectId = require('mongoose').Types.ObjectId;
const axios = require('axios');

//send friend request
const sendFriendRequest = async (req, res) => {
    try{
        const {User, FriendsWith} = req.body //user id , and  friend's username
  
        //takes the username and returns an _id for the friend
        const FriendsWithUsername = await UserModel.getUserId(FriendsWith);

        //gets the username of the sender
        const userInfo = await UserModel.getUserProfileInfo(User);
        const username = userInfo.Username;

        //trys to send friend request
        const request = await Friend.sendFriendRequest(User, FriendsWithUsername);

        const title = "Friend Request";
        const message = username + " sent you a friend request!";

        //if friend request sent, then adds to recipient's notifications
        const sendNotification = await NotificationsModel.sendNotification(FriendsWithUsername, title, message);

        //if friend has friend request emails enabled, then emails the friend
        const settings = await SettingsModel.getSettings(FriendsWithUsername);
        const friendEmailEnabled = settings.FriendRequestEmails;
        
        if(friendEmailEnabled){
            const friend = await UserModel.getUserProfileInfo(FriendsWithUsername);
            const friendsEmail = friend.Email;
            const friendname = friend.FirstName;

            const emailInfo = {
                to: friendsEmail,
                subject: "Habbit Connect - " + friendname + " you have recieved a friend request!",
                text: message
            }
            await axios.post('http://localhost:8081/api/verification/sendEmail', emailInfo);
        }

        res.status(200).json({request, sendNotification})
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
            Username: userInfo.Username,
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
        const {User, FriendsWith, notificationID} = req.body
    
        //accepts friend request
        const request = await Friend.acceptFriendRequest(User, FriendsWith, notificationID);

        //removed the notification from the notification table
        const acceptFriendRequest = await NotificationsModel. deleteNotification(notificationID);  

        //gets the username of the accepter of the friend request
        const userInfo= await UserModel.getUserProfileInfo(User)
        const usersName = userInfo.Username;

        //makes title and message for notification to be sent to sender of friend request
        const title = "Friend Request Accepted"
        const message = usersName + " has accepted your friend request!"

        //sends notification to the sender of the friend request that the friend request has been accepted
        const sendNotification = await NotificationsModel.sendNotification( FriendsWith, title, message);

        //if the sender has emails enabled for friend requests then it sends an email
        const settings = await SettingsModel.getSettings(FriendsWith);
        const friendEmailEnabled = settings.FriendRequestEmails;
        
        if(friendEmailEnabled){
            const friend = await UserModel.getUserProfileInfo(FriendsWith);
            const friendsEmail = friend.Email;
            const friendname = friend.FirstName;

            const emailInfo = {
                to: friendsEmail,
                subject: "Habbit Connect - " + friendname + " Friend Request Accepted",
                text: message
            }
            await axios.post('http://localhost:8081/api/verification/sendEmail', emailInfo);
        }

        //deletes the friend request from the notification table
        await NotificationsModel.deleteNotification(notificationID);

        res.status(200).json("Friend Request Accepted!")
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//declines a friend request
const declineFriendRequest = async (req, res) => {
    try{
        const {User, FriendsWith, notificationID} = req.body
    
        //deleted friend request record
        const request = await Friend.deleteFriendRecord(User, FriendsWith);

        //removed the notification from the notification table
        const acceptFriendRequest = await NotificationsModel. deleteNotification(notificationID);  

        //gets the username of the accepter of the friend request
        const usersName = await UserModel.getUserProfileInfo(User).Username;

        //makes title and message for notification to be sent to sender of friend request
        const title = "Friend Request Declined"
        const message = username + " has declined your friend request!"

        //sends notification to the sender of the friend request that the friend request has been accepted
        const sendNotification = await NotificationsModel.sendNotification( FriendsWith, User, title, message);

        res.status(200).json("Friend Request Declined!")
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//deletes a friend 
const deleteFriend = async (req, res) => {
    try{
        const {User, FriendsWith} = req.body
    
        const User_id = new ObjectId(User);
        const Friend_id = new ObjectId(FriendsWith);

        //deletes friend record
        const request = await Friend.deleteFriendRecord(User_id, Friend_id);

        

        //sends a notifiaction to the recipient


        res.status(200).json("Friend Removed From Friends List!")
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {sendFriendRequest, returnFriendsList, returnFriendRequests, acceptFriendRequest, declineFriendRequest, deleteFriend, returnLeaderBoard}