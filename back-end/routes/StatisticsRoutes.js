const express = require('express')

const { habitsCompletedLast30Days } = require('../controllers/StatisticsController');

const router = express.Router()
router.get('/habitsCompletedLast30Days', habitsCompletedLast30Days)

module.exports = router