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
  startTime: Date,
  endTime: Date,
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
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event
