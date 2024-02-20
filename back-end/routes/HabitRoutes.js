const express = require('express')

const { createHabit, getHabits } = require('../controllers/HabitController');

const router = express.Router()

router.post('/createHabit', createHabit)

router.post('/getHabits', getHabits)

module.exports = router