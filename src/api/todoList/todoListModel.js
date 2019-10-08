const mongoose = require('mongoose')

const todoListSchema = new mongoose.Schema({
  widget: {
    type: mongoose.Schema.ObjectId,
    ref: 'Widget',
    required: [true, 'A Todolist has to be coonected with a widget!'],
  },
})

const TodoList = mongoose.model('TodoList', todoListSchema)

module.exports = TodoList
