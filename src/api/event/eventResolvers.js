const Event = require('./eventModel.js')

const eventResolvers = {
  Query: {
    events: () => Event.find(),
  },

  Mutation: {
    createEvent: (_, { name, date }) => {
      const event = new Event({ name, date })
      return event.save()
    },
  },
}

module.exports = eventResolvers
