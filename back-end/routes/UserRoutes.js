const express = require('express')

//controller funstions
const { signupUser, loginUser } = require('../controllers/UserController')

const router = express.Router()

//login route
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)

module.exports = router