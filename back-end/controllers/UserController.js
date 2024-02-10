const User = require('../models/User')

//login user
const loginUser = async (req, res) => {
    res.json({mssg: 'login user'})
}

//signup user
const signupUser = async (req, res) => {
    const {FirstName, LastName, Email, Username, Password} = req.body

    try{
        const user = await User.signup(FirstName, LastName, Email, Username, Password)

        res.status(200).json({Username, user})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {signupUser, loginUser}