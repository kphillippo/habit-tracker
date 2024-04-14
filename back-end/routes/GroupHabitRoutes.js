const express = require('express')

//controller functions
const { createGroupHabit, editGroupHabit, joinGroupHabit, deleteGroupHabit, leaveGroupHabit, returnGroupHabitInfo, returnGroupHabits } = require('../controllers/GroupHabitController')

const router = express.Router()

router.post('/createGroupHabit', createGroupHabit)
router.post('/editGroupHabit', editGroupHabit)
router.post('/joinGroupHabit', joinGroupHabit)
router.post('/deleteGroupHabit', deleteGroupHabit)
router.post('/leaveGroupHabit', leaveGroupHabit)
router.post('/returnGroupHabitInfo', returnGroupHabitInfo)
router.post('/returnGroupHabits', returnGroupHabits)

module.exports = router