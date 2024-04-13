const express = require('express')

//controller functions
const { getCheckIns, updateCheckIn } = require('../controllers/ToDoCheckInController')

const router = express.Router()

//any routes go here
router.get('/getCheckIns', getCheckIns);
router.post('/updateCheckIn', updateCheckIn)



module.exports = router