const express = require('express')

//controller functions
const { getCheckIns, updateCheckIn, getTodayStatus } = require('../controllers/ToDoCheckInController')

const router = express.Router()

//any routes go here
router.get('/getCheckIns', getCheckIns);
router.post('/updateCheckIn', updateCheckIn)
router.get('/getTodayStatus', getTodayStatus)



module.exports = router