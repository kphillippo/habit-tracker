const express = require('express')

const { habitsCompletedLast30Days, timesHabitCompletedLast30Days, timesCompletedByHour, quickInsights } = require('../controllers/StatisticsController');

const router = express.Router()
router.get('/habitsCompletedLast30Days', habitsCompletedLast30Days)
router.get('/timesHabitCompletedLast30Days', timesHabitCompletedLast30Days)
router.get('/timesCompletedByHour', timesCompletedByHour)
router.get('/quickInsights', quickInsights)

module.exports = router