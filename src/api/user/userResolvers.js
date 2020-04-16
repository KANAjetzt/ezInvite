const User = require('./userModel')
const asyncForEach = require('../../utils/asyncForEach')
const {
  findOne,
  findAll,
  createOne,
  updateOne,
  uploadOne,
} = require('../resolverFactory')

const userResolvers = {
  Query: {
    user: (_, { id }) => findOne(User, id),
    userByLink: async (_, { link }) => {
      return await User.findOne({ link: link })
    },
    users: () => findAll(User),
  },

  Mutation: {
    //! For 1.0 - 1 User --> 1 Event  - No User Login / Profiles
    //! For 1.1 - 1 User --> MANY Events - User Profiles / Login implemtation

    createUser: async (_, { input }) => {
      const newInput = { ...input }
      // if photo is given
      if (input.photo) {
        try {
          // upload new image
          const imgUrl = await uploadOne(input.photo)
          newInput.photo = imgUrl.imgUrl
        } catch (err) {
          console.log(`error uploading User Profile Img: ${err}`)
        }
      }

      newInput.events = { _id: `${input.event}` }

      const createdUser = await createOne(User, newInput)

      return { user: createdUser }
    },

    createUsers: async (_, { input }) => {
      let newUsers = []

      await asyncForEach(input.users, async user => {
        // make copy of user for savety reasons
        const currentUser = { ...user }
        // put the event in an Array
        // (currently unnecessary but later users will maybe able to be in multiple events)
        currentUser.events = [user.event]
        // Save User in DB
        const newUser = await User.create(currentUser)
        // Add createdUser to newUsers Array
        newUsers = [...newUsers, newUser]
      })

      return { users: newUsers }
    },

    updateUser: async (_, { input }) => {
      const newInput = { ...input }
      // if photo is given
      if (input.photo) {
        // upload new image
        const imgUrl = await uploadOne(input.photo)
        newInput.photo = imgUrl.imgUrl
      }

      // change user property to id
      newInput.id = input.user
      // and delte user property because updateOne searchs .id in
      // newInput
      delete newInput.user

      const updatedUser = await updateOne(User, newInput)
      return { user: updatedUser }
    },

    // ! For 1.1 this needs some work !
    // ! User is set to accapted - with multiply events this will not work so ez
    toggleUserAccepted: async (_, { input }) => {
      // query user by link and update accapted state
      const updatedUser = await User.findOneAndUpdate(
        { link: input.link },
        { accepted: input.accepted },
        { new: true }
      )

      return { user: updatedUser }
    },
  },
}

module.exports = userResolvers
