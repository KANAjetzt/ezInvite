const Event = require('./eventModel.js')
const { createOne, updateOne, deleteOne } = require('../resolverFactory')

const eventResolvers = {
  Query: {
    events: () => Event.find(),
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

    updateEvent: (_, args) => updateOne(Event, args),
    deleteEvent: (_, { id }) => deleteOne(Event, id),
  },
}

module.exports = eventResolvers
