const express = require('express')

//controller functions
const { returnNotifications, deleteNotification,  numOfNotifications } = require('../controllers/NotificationsController')

const router = express.Router()

//returns all the notifications
router.post('/returnNotifications', returnNotifications)

//returns the number of notifications a user has
router.post('/numOfNotifications', numOfNotifications)

//deletes a notificaion
router.post('/deleteNotification', deleteNotification)

module.exports = router