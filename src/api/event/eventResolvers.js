const Event = require('./eventModel.js')
const {
  findOne,
  findAll,
  createOne,
  updateOne,
  deleteOne,
} = require('../resolverFactory')
const { myEmitter } = require('../../utils/events')

// Create the user reverence when a new User is created
myEmitter.on('userCreated', async props => {
  await Event.findByIdAndUpdate(props.eventId, {
    $push: { users: props.userId },
  })
})

const eventResolvers = {
  Query: {
    event: (_, { id }) => findOne(Event, id),
    events: () => findAll(Event),
  },

  Mutation: {
    createEvent: (
      _,
      {
        name,
        startDate,
        endDate,
        startTime,
        endTime,
        description,
        heroImg,
        imgs,
        location,
        widgetTypes,
      }
    ) => {
      const event = {
        name,
        startDate,
        endDate,
        startTime,
        endTime,
        description,
        heroImg,
        imgs,
        location,
        widgets: [{ type: `${widgetTypes}` }],
      }

      return createOne(Event, event)
    },
    //! by updating the location non given fields get emptied
    updateEvent: (_, args) => updateOne(Event, args),
    deleteEvent: (_, { id }) => deleteOne(Event, id),
  },
}

module.exports = eventResolvers
