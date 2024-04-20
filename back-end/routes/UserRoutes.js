const express = require('express')

//controller functions
const { signupUser, loginUser, deleteUserByUsername, getUserProfileInfo, updateUserInfo, updatePassword, emailExists, forgotPassword} = require('../controllers/UserController')

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

//updatePassword
router.post('/updatePassword', updatePassword)

//emailExists
router.post('/emailExists', emailExists)

//forgotPassword
router.post('/forgotPassword', forgotPassword)

module.exports = router