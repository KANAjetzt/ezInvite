const crypto = require('crypto')
const mongoose = require('mongoose')
const slugify = require('slugify')
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
  imgs: [String],
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
  slug: String,
  link: String,
  editLink: String,
})

// Emit Event widgetCreated when ever a new Event is created,
// this event is used to create new Todo List or other Widgets - based on ther type.
//! Not in use at the moment
// eventSchema.post('save', function(doc, next) {
//   if (!doc.widgets[0]) return next()

//   myEmitter.emit('widgetCreated', doc.widgets)
//   next()
// })

// ############# DOCUMENT MIDDLEWARE ###############
eventSchema.pre('save', function(next) {
  // Generate slug based on event name
  this.slug = slugify(this.name, { lower: true })

  // Generate a random URL Path to sahre Event publicly
  this.link = crypto.randomBytes(3).toString('hex')

  // Generate a random URL Path to edit the event
  this.editLink = crypto.randomBytes(3).toString('hex')

  next()
})

// ############# QUERY MIDDLEWARE ###############

eventSchema.pre(/^find/, function(next) {
  this.populate('users')
  next()
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event
