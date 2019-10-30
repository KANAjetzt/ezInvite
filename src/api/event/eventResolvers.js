const Event = require('./eventModel.js')
const {
  findOne,
  findAll,
  createOne,
  updateOne,
  deleteOne,
  uploadOne,
  uploadMultiple,
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
    createEvent: async (_, { input }) => {
      return { event: await createOne(Event, input) }
    },

    //! by updating the location non given fields get emptied
    updateEvent: (_, args) => updateOne(Event, args),
    deleteEvent: (_, { id }) => deleteOne(Event, id),
    uploadHeroImg: async (_, { file }) => {
      await uploadOne(Event, file)
    },
    uploadImgs: async (_, { file }) => {
      console.log(file)
      console.log('TRIIIIGGERD')
      await uploadMultiple(Event, file)
    },
  },
}

module.exports = eventResolvers
