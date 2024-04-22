const express = require('express')

const { habitsCompletedLast30Days, timesHabitCompletedLast30Days, timesCompletedByHour } = require('../controllers/StatisticsController');

const router = express.Router()
router.get('/habitsCompletedLast30Days', habitsCompletedLast30Days)
router.get('/timesHabitCompletedLast30Days', timesHabitCompletedLast30Days)
router.get('/timesCompletedByHour', timesCompletedByHour)

module.exports = router