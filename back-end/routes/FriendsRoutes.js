const express = require('express')

//controller functions
const { sendFriendRequest } = require('../controllers/FriendsController')

const router = express.Router()

//send friend request route
router.post('/sendFriendRequest', sendFriendRequest)




module.exports = router