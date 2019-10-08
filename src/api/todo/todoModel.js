const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  todoList: {
    type: mongoose.Schema.ObjectId,
    ref: 'TodoList',
    required: [true, 'A Todolist has to be coonected with a widget!'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
