const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
  page: String,
  date: Date,
})

const Feedback = mongoose.model('Feedback', feedbackSchema)

module.exports = Feedback
