const express = require('express')

//controller functions
const { signupUser, loginUser, deleteUserByUsername, getUserProfileInfo, updateUserInfo} = require('../controllers/UserController')

const router = express.Router()

//delete route
router.post('/delete', deleteUserByUsername)

//login route
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)

//userProfileInfoRoute
router.post('/userProfileInfo', getUserProfileInfo)

//updateUserInfoRoute
router.post('/updateUserInfo', updateUserInfo)

module.exports = router