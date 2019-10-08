const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  todoList: {
    type: mongoose.Schema.ObjectId,
    ref: 'TodoList',
    required: [true, 'A Todolist has to be coonected with a widget!'],
  },
  users: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  text: {
    type: String,
    required: [true, 'Please provide some text about what you bring.'],
  },
  requiredPersons: {
    type: Number,
    default: 1,
  },
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
