const express = require('express')

//controller functions
const { createGroupHabit, editGroupHabit, joinGroupHabit, deleteGroupHabit, leaveGroupHabit } = require('../controllers/GroupHabitController')

const router = express.Router()

router.post('/createGroupHabit', createGroupHabit)
router.post('/editGroupHabit', editGroupHabit)
router.post('/joinGroupHabit', joinGroupHabit)
router.post('/deleteGroupHabit', deleteGroupHabit)
router.post('/leaveGroupHabit', leaveGroupHabit)

module.exports = router