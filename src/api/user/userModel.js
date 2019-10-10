const mongoose = require('mongoose')
const { myEmitter } = require('../../utils/events')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  accepted: {
    type: Boolean,
    default: undefined,
  },
  link: String,
  events: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Event',
    },
  ],
})

// This Event is used to create the user reference in the event document
userSchema.post('save', function(doc, next) {
  console.log(doc)
  myEmitter.emit('userCreated', { userId: doc._id, eventId: doc.events[0] })
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
