const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  widget: {
    type: mongoose.Schema.ObjectId,
    ref: 'Widget',
    required: [true, 'A todo has to be associated with a widget!'],
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

// ############# QUERY MIDDLEWARE ###############

todoSchema.pre(/^find/, function(next) {
  this.populate('users')
  next()
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
