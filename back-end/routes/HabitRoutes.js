const express = require('express')

const { createHabit, getHabits, updateHabit, deleteHabit } = require('../controllers/HabitController');

const router = express.Router()

router.post('/createHabit', createHabit)

router.get('/getHabits', getHabits)

router.post('/updateHabit', updateHabit)

router.delete('/deleteHabit', deleteHabit)

module.exports = router