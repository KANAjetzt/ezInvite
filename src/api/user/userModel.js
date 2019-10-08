const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  evnts: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Event',
    },
  ],
})

const User = mongoose.model('User', userSchema)

module.exports = User
