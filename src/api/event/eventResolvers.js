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
      // when the event link is given
      if (input.link) {
        // find One Event with the input slug and link
        const event = await Event.findOne({
          slug: input.slug,
          link: input.link,
        })
        return event
      }
      // when the event editLink is given
      if (input.editLink) {
        // find One Event with the input slug and editLink
        const event = await Event.findOne({
          slug: input.slug,
          editLink: input.editLink,
        })
        return event
      }
    },
    events: () => findAll(Event),
  },

  Mutation: {
    createEvent: async (_, { input }) => {
      // create copy of input for savety reasons
      const newInput = { ...input }

      // create new widget based on type
      if (newInput.widgetTypes) {
        newInput.widgets = input.widgetTypes.map(type => {
          return { type }
        })
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
      return { event: newEvent }
    },

    //! by updating the location non given fields get emptied
    updateEvent: async (_, { input }) => {
      // create copy of input for savety reasons
      const newInput = { ...input }

      // create new widget based on type
      if (newInput.widgetTypes) {
        newInput.widgets = input.widgetTypes.map(type => {
          return { type }
        })
      }

      if (input.heroImg && typeof input.heroImg !== 'string') {
        // Upload Hero Img
        const imgUrl = await uploadOne(input.heroImg)
        newInput.heroImg = imgUrl.imgUrl
      }

      if (input.imgs && typeof input.imgs[0] !== 'string') {
        // Upload Imgs from Img Stripe
        const imgUrls = await asyncMap(input.imgs, async img => {
          const imgUrl = await uploadOne(img)
          return imgUrl.imgUrl
        })

        newInput.imgs = imgUrls
      }
      // Write input data to DB
      const newEvent = await updateOne(Event, newInput, newInput.id)
      return { event: newEvent }
    },

    deleteEvent: (_, { id }) => deleteOne(Event, id),

    uploadHeroImg: async (_, { file }) => {
      await uploadOne(Event, file)
    },

    uploadImgs: async (_, { files }) => {
      await uploadMultiple(Event, files)
    },
  },
}

module.exports = eventResolvers
