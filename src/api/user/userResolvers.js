const User = require('./userModel')

const userResolvers = {
  Query: {
    users: () => User.find(),
  },

  Mutation: {
    createUser: (_, { name, photo }) => {
      const user = new User({ name, photo })
      return user.save()
    },
  },
}

module.exports = userResolvers
