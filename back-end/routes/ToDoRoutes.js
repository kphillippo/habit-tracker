const express = require('express')

//controller functions
const { createToDo, getTodos, deleteToDo } = require('../controllers/ToDoController')

const router = express.Router()

//any routes go here

router.post('/create', createToDo);
router.delete('/delete', deleteToDo);
router.get('/get', getTodos);

module.exports = router