const express = require('express')

//controller functions
const { UpdateHabitCheckIn, GetHabitCheckIns } = require('../controllers/HabitCheckInController')

const router = express.Router()

//any routes go here

router.get('/getHabitCheckIns', GetHabitCheckIns);
router.post('/updateHabitCheckIn', UpdateHabitCheckIn);


module.exports = router