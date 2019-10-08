const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for your Event!'],
  },
  date: {
    type: Date,
    required: [true, 'Please provide the Date of your Event'],
  },
  startTime: String,
  endTime: String,
  description: String,
  heroImg: {
    type: String,
    default: 'defaultHero.jpg',
  },
  imgs: {
    type: [String],
    default: ['defaultImg1.jpg', 'defaultImg2.jpg', 'defaultImg3.jpg'],
  },
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    coordinates: [Number],
    address: String,
    description: String,
  },
  users: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  widgets: [
    {
      type: {
        type: String,
        required: [
          true,
          'Please provide a Widget type! (for example: todoList)',
        ],
      },
    },
  ],
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event
