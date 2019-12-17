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
const asyncMap = require('../../utils/asyncMap')

// Create the user reverence when a new User is created
myEmitter.on('userCreated', async props => {
  await Event.findByIdAndUpdate(props.eventId, {
    $push: { users: props.userId },
  })
})

const eventResolvers = {
  Query: {
    event: async (_, { input }) => {
      // find One Event with the input slug and link
      const event = await Event.findOne({
        slug: input.slug,
        link: input.link,
      })

      return event
    },
    events: () => findAll(Event),
  },

  Mutation: {
    createEvent: async (_, { input }) => {
      // create copy of input for savety reasons
      const newInput = { ...input }
      console.log(newInput)

      // create new widget based on type
      if (newInput.widgetTypes) {
        newInput.widgets = input.widgetTypes.map(type => {
          return { type }
        })
        console.log(newInput)
      }

      if (input.heroImg) {
        // Upload Hero Img
        const imgUrl = await uploadOne(input.heroImg)
        newInput.heroImg = imgUrl.imgUrl
      }

      if (input.imgs) {
        // Upload Imgs from Img Stripe
        const imgUrls = await asyncMap(input.imgs, async img => {
          const imgUrl = await uploadOne(img)
          return imgUrl.imgUrl
        })

        newInput.imgs = imgUrls
      }
      // Write input data to DB
      const newEvent = await createOne(Event, newInput)
      console.log(newEvent)
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
