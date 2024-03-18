const express = require('express')

//controller functions
const { sendFriendRequest, returnFriendsList, returnFriendRequests, acceptFriendRequest, declineFriendRequest, deleteFriend, returnLeaderBoard } = require('../controllers/FriendsController')

const router = express.Router()

//send friend request route
router.post('/sendFriendRequest', sendFriendRequest)

//return freinds list route
router.post('/returnFriendsList', returnFriendsList)

//return friend requests route
router.post('/returnFriendRequests', returnFriendRequests)

//accepts a friend request
router.post('/acceptFriendRequest', acceptFriendRequest)

//declines a friend request
router.post('/declineFriendRequest', declineFriendRequest)

//deletes a friend
router.post('/deleteFriend', deleteFriend)

//Returns Leaderboard
router.post('/returnLeaderBoard', returnLeaderBoard )

module.exports = router