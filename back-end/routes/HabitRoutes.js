const express = require('express')

const { createHabit, getHabits } = require('../controllers/HabitController');

const router = express.Router()

router.post('/createHabit', createHabit)

router.get('/getHabits', getHabits)

router.post('/updateHabit', updateHabit)

module.exports = router