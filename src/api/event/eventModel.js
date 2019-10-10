const mongoose = require('mongoose')
const { myEmitter } = require('../../utils/events')

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for your Event!'],
  },
  startDate: {
    type: Date,
    required: [true, 'Please provide the Date of your Event'],
  },
  endDate: Date,
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
    name: String,
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

// Emit Event widgetCreated when ever a new Event is created,
// this event is used to create new Todo List or other Widgets - based on ther type.
//! Not in use at the moment
// eventSchema.post('save', function(doc, next) {
//   if (!doc.widgets[0]) return next()

//   myEmitter.emit('widgetCreated', doc.widgets)
//   next()
// })

const Event = mongoose.model('Event', eventSchema)

module.exports = Event
