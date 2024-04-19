const express = require('express')

const { habitsCompletedLast30Days, timesHabitCompletedLast30Days } = require('../controllers/StatisticsController');

const router = express.Router()
router.get('/habitsCompletedLast30Days', habitsCompletedLast30Days)
router.get('/timesHabitCompletedLast30Days', timesHabitCompletedLast30Days)

module.exports = router