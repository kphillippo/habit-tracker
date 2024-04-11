const User = require('../models/User')
const Friends = require('../models/Friends');
const Settings = require('../models/Settings');
const Todos = require('../models/ToDo');
const Habits = require('../models/Habit');
const Notifications = require('../models/Notifications');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

//creates a token using the sercret variable from our .env file
const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

//login user
const loginUser = async (req, res) => {
const {Username, Password} = req.body
  try{
    //trys to login user
    const user = await User.login(Username, Password)
    
    //create a token
    const token = createToken(user._id)

    //gets required data
    const FirstName = user.FirstName
    const LastName = user.LastName
    const Email = user.Email
    const Streak = user.Streak
    const _id = user._id

    //checks how many habits and doto's the user has left to do today
    const numHabitsLeft = Habits.getNumUncompletedHabitsToday(_id);
    const numTodosLeft = Habits.getNumUncompletedTodosToday(_id);

    //message variables
    const habitTitle = "You Have Habits To Do"
    const todoTitle = "You Have ToDos To Do"
    const habitMessage = "You have " + numHabitsLeft + " habits left to do today!"
    const todoMessage = "You have " + numHabitsLeft + " todos left to do today!"

    //checks if ther user already has a notification for todos and habits
    const habitNotificationExist = Notifications.lookForRecord(_id, habitTitle); 
    const todoNotificationExist = Notifications.lookForRecord(_id, todoTitle); 
    
    //if the number is greater then 1 and the user doesnt already have a notification for it, then it makes a notification, if there is a notification, it updates the numbers
    if (numHabitsLeft > 1){
      if(!habitNotificationExist || habitNotificationExist.length === 0){
        const sendNotification = await Notifications.sendNotification( _id, habitTitle, habitMessage);
      }else{
        const habitId = habitNotificationExist._id
        const updateNotification = await Notifications.updateNotification(habitId, habitMessage);
      }
    }

    if (numTodosLeft > 1)
    {
      if(!todoNotificationExist || todoNotificationExist.length === 0){
        const sendNotification = await Notifications.sendNotification( _id, todoTitle, todoMessage);
      }else{
        const todoId = todoNotificationExist._id
        const updateNotification = await Notifications.updateNotification(todoId, todoMessage);
      }
    }

    res.status(200).json({_id, Username, token, FirstName, LastName, Streak, Email})
  }catch(error){
    res.status(400).json({error: error.message})
  }
}

//signup user
const signupUser = async (req, res) => {
  try{
    const {FirstName, LastName, Email, Username, Password, Streak} = req.body

    //trys to sign up user
    const user = await User.signup(FirstName, LastName, Email, Username, Password)

    //adds settings to user with defult values
    await Settings.onSignupSettings(user._id)

    //create a token
    const token = createToken(user._id)
    const _id = user._id

    res.status(200).json({_id, Username, token, FirstName, LastName, Streak, Email})
  }catch(error){
    res.status(400).json({error: error.message})
  }
}

// Controller function to handle user deletion by username
const deleteUserByUsername = async (req, res) => {
  try {
    const {Username} = req.body

    // Call the static method defined in the User schema to delete the user by username
    const deletionResult = await User.delete(Username);

    // Check if the user was deleted successfully
    res.status(200).json({ message: deletionResult.message });
  } catch (error) {
    // Handle errors
    return res.status(500).json({ error: 'User not found!' });
  }
}

//Controller function to get User Info for the Profile Page
const getUserProfileInfo = async (req, res) => {
  try {
    const Owner = req.query.user_id;

    // Retrieve user information
    const userInfo = await User.getUserProfileInfo(Owner);

    // Retrieve friends of the user
    const userFriends = await Friends.findFriends(Owner);

    // Extract the _id of each friend
const friendIds = userFriends.map(friend => friend.FriendsWith);

// Retrieve the username, firstName, LastName, Email, and Streak of each friend based on their _id
const friendData = await User.aggregate([
  { $match: { _id: { $in: friendIds } } },
  { $project: { _id: 1, Username: 1, Streak: 1, FirstName: 1, LastName: 1, Email: 1 } }
]);

// Map friend data to friend objects
const populatedFriends = userFriends.map(friend => {
  const friendInfo = friendData.find(data => data._id.toString() === friend.FriendsWith.toString());
  return {
    // Include specific properties from the friendInfo object
    id: friendInfo._id, Username: friendInfo.Username, Streak: friendInfo.Streak, FirstName: friendInfo.FirstName, LastName: friendInfo.LastName, Email: friendInfo.Email
  };
});

    // Respond with user information and populated friends' data
    const Email = userInfo.Email;
    const FirstName = userInfo.FirstName;
    const LastName = userInfo.LastName;
    const Username = userInfo.Username;

    res.status(200).json({ Email, FirstName, LastName, Username, userFriends: populatedFriends });
  } catch (error) {
      res.status(400).json({error: error.message});
  }
}

//edits user information (later we will have to make them verify thier email before it updates)
const updateUserInfo = async (req, res) => {
    const { _id, FirstName, LastName, Email, Username } = req.body;

    // Check if the provided email already exists in the database
    const existingEmailUser = await User.findOne({ Email });
    if (existingEmailUser && existingEmailUser._id.toString() !== _id) {
      return res.status(400).json({ success: false, error: 'Email already in use!' });
    }

    // Check if the provided username already exists in the database
    const existingUsernameUser = await User.findOne({ Username });
    if (existingUsernameUser && existingUsernameUser._id.toString() !== _id) {
      return res.status(400).json({ success: false, error: 'Username already exists!' });
    }

    const updatedFields = {FirstName, LastName, Email, Username};

    // Call the static method defined in the User schema to update the user's record by username
    const updateResult = await User.findOneAndUpdate( {_id: _id}, { $set: updatedFields }, { new: true });

    // the user's record was updated successfully
    res.status(200).json({ message: 'User record updated successfully!', success: true});
}

//updates password
const updatePassword = async (req, res) => {
  try {
    const { _id, Password, newPassword } = req.body;

    // Call the static method defined in the User schema to update the user's record by username
    const updateResult = await User.updatePassword( _id, Password, newPassword );

    // the user's record was updated successfully
    res.status(200).json({ message: 'User password updated successfully!', success: true});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}
  
module.exports = {signupUser, loginUser, deleteUserByUsername, getUserProfileInfo, updateUserInfo, updatePassword }