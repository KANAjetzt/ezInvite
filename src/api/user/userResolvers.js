const User = require('./userModel')
const { findOne, findAll, createOne, updateOne } = require('../resolverFactory')

const userResolvers = {
  Query: {
    user: (_, { id }) => findOne(User, id),
    users: () => findAll(User),
  },

  Mutation: {
    //! For 1.0 - 1 User --> 1 Event  - No User Login / Profiles
    //! For 1.1 - 1 User --> MANY Events - User Profiles / Login implemtation

    createUser: (_, { name, event, photo }) => {
      const user = {
        name,
        events: { _id: `${event}` },
        photo,
      }

      return createOne(User, user)
    },
    updateUser: (_, args) => updateOne(User, args),

    // ! For 1.1 this needs some work !
    // ! User is set to accapted - with multiply events this will not work so ez
    toggleUserAccepted: (_, args) => updateOne(User, args),
  },
}

module.exports = userResolvers
