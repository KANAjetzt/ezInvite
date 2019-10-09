const Event = require('./eventModel.js')

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
      const event = new Event({
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
      })

      return event.save()
    },

    updateEvent: (_, args) => {
      const body = { ...args }
      delete body.eventId

      return Event.findByIdAndUpdate(args.eventId, body)
    },

    deleteEvent: (_, { eventId }) => Event.findByIdAndRemove(eventId),
  },
}

module.exports = eventResolvers
