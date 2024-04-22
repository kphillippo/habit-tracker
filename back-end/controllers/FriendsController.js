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
        const message = `
                    <p>
            <span style="color:rgb(56, 118, 29);">
                <strong>HabitConnect Friend Request Received</strong>
            </span>
            </p>
            <p>
            <strong>You’ve received a friend request from user 
            </strong>
            <span style="text-decoration:underline;">
                <strong>`+ username +`.</strong>
            </span>
            </p>
            <p>Login and click on your notifications to respond!</p>
            <p>
                <strong><a href="http://localhost:3000/Signin">GO TO HABITCONNECT</a></strong>
            </p>
            <span style="color:rgb(153, 153, 153);">Have questions or trouble logging in? Please contact us
            </span>
            <a target="_blank" href="mailto:habittrackerrr@gmail.com">
            <span style="color:rgb(17, 85, 204);">here</span>
            </a>
            <span style="color:rgb(153, 153, 153);">.</span>

        `;

        const message2 = username+ " sent you a friend request!"

        //if friend request sent, then adds to recipient's notifications
        const sendNotification = await NotificationsModel.sendFriendNotification(FriendsWithUsername, title, message2, username);

        //if friend has friend request emails enabled, then emails the friend
        const settings = await SettingsModel.getSettings(FriendsWithUsername);
        const friendEmailEnabled = settings.FriendRequestEmails;
        
        if(friendEmailEnabled){
            const friend = await UserModel.getUserProfileInfo(FriendsWithUsername);
            const friendsEmail = friend.Email;
            const friendUsername = friend.FirstName;

            const emailInfo = {
                to: friendsEmail,
                subject: "HabitConnect: Friend Request Received",
                text: message
            }
            await axios.post('http://localhost:8081/api/verification/sendEmail', emailInfo);
        }

        res.status(200).json("Friend Request Sent!")
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

//accepts a friend request
const acceptFriendRequest = async (req, res) => {
    try{
        const {User, FriendsWithUsername, notificationID} = req.body

        const FriendsWith = await UserModel.getUserId(FriendsWithUsername);
    
        //accepts friend request
        const request = await Friend.acceptFriendRequest(User, FriendsWith, notificationID); 

        //gets the username of the accepter of the friend request
        const userInfo= await UserModel.getUserProfileInfo(User)
        const usersName = userInfo.Username;

        //makes title and message for notification to be sent to sender of friend request
        const title = "Friend Request Accepted"
        const message = `
        <p>
        <span style="color:#38761d;">
            <strong>HabitConnect Friend Request Accepted</strong>
        </span>
        </p>
        <p>
        <strong>User
        </strong>
        <span style="text-decoration:underline;">
            <strong>`+ usersName +`</strong>
        </span>
        <strong>
            accepted your friend request.</strong>
        </p>
        <p>Login to view their profile!</p>
        <p>
            <strong><a href="http://localhost:3000/Signin">GO TO HABITCONNECT</a></strong>
        </p>
        <p>
        <span style="color:rgb(153, 153, 153);">Have questions or trouble logging in? Please contact us
        </span>
        <a target="_blank" href="mailto:habittrackerrr@gmail.com">
            <span style="color:rgb(17, 85, 204);">here</span>
        </a>
        <span style="color:rgb(153, 153, 153);">.
        </span>
        </p>
        `

        const message2 = usersName+ " accepted your friend request!"

        //sends notification to the sender of the friend request that the friend request has been accepted
        const sendNotification = await NotificationsModel.sendFriendNotification( FriendsWith, title, message2, usersName);

        //if the sender has emails enabled for friend requests then it sends an email
        const settings = await SettingsModel.getSettings(FriendsWith);
        const friendEmailEnabled = settings.FriendRequestEmails;
        
        if(friendEmailEnabled){
            const friend = await UserModel.getUserProfileInfo(FriendsWith);
            const friendsEmail = friend.Email;

            const emailInfo = {
                to: friendsEmail,
                subject: "HabitConnect: Friend Request Accepted",
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
        const {User, FriendsWithUsername, notificationID} = req.body

        const FriendsWith = await UserModel.getUserId(FriendsWithUsername);
    
        //deleted friend request record
        const request = await Friend.deleteFriendRecord(User, FriendsWith);

        //removed the notification from the notification table
        const acceptFriendRequest = await NotificationsModel. deleteNotification(notificationID);  

        res.status(200).json("Friend Request Declined!")
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//deletes a friend 
const deleteFriend = async (req, res) => {
    try{
        const {User, FriendsWith} = req.body

        //deletes friend record
        const request = await Friend.deleteFriendRecord(User, FriendsWith);

        res.status(200).json("Friend Removed From Friends List!")
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {sendFriendRequest, returnFriendsList, acceptFriendRequest, declineFriendRequest, deleteFriend, returnLeaderBoard}