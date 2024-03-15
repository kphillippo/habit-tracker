const express = require('express')

//controller functions
const { createToDo, getToDos, updateToDo, deleteToDo } = require('../controllers/ToDoController')

const router = express.Router()

//any routes go here

router.post('/create', createToDo);
router.delete('/delete', deleteToDo);
router.get('/get', getToDos);
router.post('/update', updateToDo);

module.exports = router