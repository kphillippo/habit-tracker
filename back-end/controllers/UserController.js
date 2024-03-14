const User = require('../models/User')
const Friends = require('../models/Friends');
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

    res.status(200).json({_id, Username, token, FirstName, LastName, Streak, Email})
  }catch(error){
    res.status(400).json({error: error.message})
  }
}

//signup user
const signupUser = async (req, res) => {
  const {FirstName, LastName, Email, Username, Password, Streak} = req.body

  try{
    //trys to sign up user
    const user = await User.signup(FirstName, LastName, Email, Username, Password)

    //create a token
    const token = createToken(user._id)

    res.status(200).json({Username, token, FirstName, LastName, Streak, Email})
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

    // Retrieve the username and Streak of each friend based on their _id
    const friendData = await User.aggregate([
      { $match: { _id: { $in: friendIds } } },
      { $project: { _id: 1, Username: 1, Streak: 1 } }
    ]);

    // Map friend data to friend objects
    const populatedFriends = userFriends.map(friend => {
      const friendInfo = friendData.find(data => data._id.toString() === friend.FriendsWith.toString());
      return {
         // Include all existing properties of the friend object
        ...friend.toObject(),

        // Assign the Username property from friendInfo if available, otherwise null
        username: friendInfo ? friendInfo.Username : null,

        // Assign the Streak property from friendInfo if available, otherwise null
        Streak: friendInfo ? friendInfo.Streak : null
      };
    });

    // Respond with user information and populated friends' data
    const Email = userInfo.Email;
    res.status(200).json({ Email, userFriends: populatedFriends });
  } catch (error) {
      res.status(400).json({error: error.message});
  }
}

//edits user information (later we will have to make them verify thier email before it updates)
const updateUserByID = async (req, res) => {
  try {
    const { FirstName, LastName, Email, Username } = req.body;

    // Call the static method defined in the User schema to update the user's record by username
    const updateResult = await User.findOneAndUpdate( );

    // Check if the user's record was updated successfully
    if (updateResult) {
      res.status(200).json({ message: 'User record updated successfully', user: updateResult });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    // Handle errors
    return res.status(500).json({ error: 'Error updating user record!' });
  }
}
  
module.exports = {signupUser, loginUser, deleteUserByUsername, getUserProfileInfo}