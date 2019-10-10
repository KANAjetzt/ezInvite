const User = require('./userModel')
const { createOne } = require('../resolverFactory')

const userResolvers = {
  Query: {
    users: () => User.find(),
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
  },
}

module.exports = userResolvers
