const User = require('../models/User')
const jwt = require('jsonwebtoken')

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
      if (deletionResult.success) {
        // User was deleted successfully
        return res.status(200).json({ message: deletionResult.message });
      } else {
        // User was not found (or other deletion error)
        return res.status(404).json({ message: deletionResult.message });
      }
    } catch (error) {
      // Handle errors (e.g., database error, server error)
      console.error('Error deleting user:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
}
  

module.exports = {signupUser, loginUser, deleteUserByUsername}