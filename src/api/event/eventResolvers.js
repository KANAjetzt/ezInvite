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
        date,
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
        date,
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
  },
}

module.exports = eventResolvers
