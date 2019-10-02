const User = require('./models/userModel')

const resolvers = {
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

module.exports = resolvers
