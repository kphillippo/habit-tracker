const express = require('express')

//controller functions
const { createToDo, getToDos, updateToDo, deleteToDo } = require('../controllers/ToDoController')

const router = express.Router()

//any routes go here

router.post('/createTodo', createToDo);
router.delete('/deleteTodo', deleteToDo);
router.get('/getTodos', getToDos);
router.post('/updateTodo', updateToDo);

module.exports = router