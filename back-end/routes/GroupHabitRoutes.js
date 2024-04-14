const express = require('express')

//controller functions
const { createGroupHabit, editGroupHabit } = require('../controllers/GroupHabitController')

const router = express.Router()

router.post('/createGroupHabit', createGroupHabit)
router.post('/editGroupHabit', editGroupHabit)

module.exports = router