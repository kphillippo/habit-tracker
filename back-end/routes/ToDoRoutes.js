const express = require('express')

//controller functions
const { createToDo, deleteToDo } = require('../controllers/ToDoController')

const router = express.Router()

//any routes go here

router.post('/create', createToDo);
router.delete('/delete', deleteToDo);


module.exports = router