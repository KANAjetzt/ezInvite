const mongoose = require('mongoose')

const widgetSchema = new mongoose.Schema({
  type: String,
  required: [true, 'Please provide a Widget type! (for example: todoList)'],
})

const Widget = mongoose.model('Widget', widgetSchema)

module.exports = Widget
