const express = require('express')

const { createHabit, getHabits, updateHabit, deleteHabit, getHabitsCompletedOnDate } = require('../controllers/HabitController');

const router = express.Router()

router.post('/createHabit', createHabit)

router.get('/getHabits', getHabits)

router.post('/updateHabit', updateHabit)

router.delete('/deleteHabit', deleteHabit)

router.get('/getHabitsCompletedOnDate', getHabitsCompletedOnDate)

module.exports = router