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

        res.status(200).json({Username, token, FirstName, LastName, Streak, Email})
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

module.exports = {signupUser, loginUser}