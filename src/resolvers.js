const Cat = require('./models/Cat')

// The resolvers
const resolvers = {
  Query: {
    cats: () => Cat.find(),
  },
  Mutation: {
    createCat: (_, { name }) => {
      const kitty = new Cat({ name })
      return kitty.save()
    },
  },
}

module.exports = resolvers
