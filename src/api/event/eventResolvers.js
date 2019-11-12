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
      const newInput = { ...input }

      // create new widget based on type
      newInput.widgets = input.widgetTypes.map(type => {
        return { type }
      })

      // clear imgs Array --> no validation error
      newInput.imgs = []
      newInput.heroImg = undefined

      // Write input data to DB
      const newEvent = await createOne(Event, newInput)
      // console.log(newEvent)
      console.log(newInput)

      // Upload Hero Img and save URL to DB
      uploadOne(Event, newEvent._id, input.heroImg)

      // Upload Imgs from Img Stripe and save URLs to DB
      uploadMultiple(Event, newEvent._id, input.imgs)

      return { event: newEvent }
    },

    //! by updating the location non given fields get emptied
    updateEvent: (_, args) => updateOne(Event, args),
    deleteEvent: (_, { id }) => deleteOne(Event, id),
    uploadHeroImg: async (_, { file }) => {
      await uploadOne(Event, file)
    },
    uploadImgs: async (_, { files }) => {
      await uploadMultiple(Event, files)
    },
    // multipleImgs: async (parent, { files }, { storeUpload }) {
    //   const { resolve, reject } = await promisesAll.all(
    //     files.map(storeUpload)
    //   )

    //   if (reject.length)
    //     reject.forEach(({ name, message }) =>
    //       console.error(`${name}: ${message}`)
    //     )

    //   return resolve
    // }
  },
}

module.exports = eventResolvers
