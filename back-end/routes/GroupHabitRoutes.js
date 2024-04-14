const express = require('express')

//controller functions
const { createGroupHabit, editGroupHabit, joinGroupHabit, deleteGroupHabit, leaveGroupHabit, returnGroupHabitInfo } = require('../controllers/GroupHabitController')

const router = express.Router()

router.post('/createGroupHabit', createGroupHabit)
router.post('/editGroupHabit', editGroupHabit)
router.post('/joinGroupHabit', joinGroupHabit)
router.post('/deleteGroupHabit', deleteGroupHabit)
router.post('/leaveGroupHabit', leaveGroupHabit)
router.post('/returnGroupHabitInfo', returnGroupHabitInfo)

module.exports = router