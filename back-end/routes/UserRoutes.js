const express = require('express')

//controller functions
const { signupUser, loginUser, deleteUserByUsername } = require('../controllers/UserController')

const router = express.Router()

//delete route
router.post('/delete', deleteUserByUsername)

//login route
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)

module.exports = router