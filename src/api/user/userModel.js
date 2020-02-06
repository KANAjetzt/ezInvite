const crypto = require('crypto')
const mongoose = require('mongoose')
const { myEmitter } = require('../../utils/events')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  photo: {
    type: String,
    default: undefined,
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

// ############# DOCUMENT MIDDLEWARE ###############

userSchema.pre('save', function(next) {
  // Generate a random URL Path --> this.link: /dfk2cls5kw7
  this.link = crypto.randomBytes(3).toString('hex')
  next()
})

// ############# QUERY MIDDLEWARE ###############

// userSchema.pre(/^find/, function(next) {
//   this.photo = `${}${this.photo}`
//   next()
// })

// This Event is used to create the user reference in the event document
userSchema.post('save', function(doc, next) {
  myEmitter.emit('userCreated', { userId: doc._id, eventId: doc.events[0] })
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
