// Some fake data
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
]

// The resolvers
const resolvers = {
  Query: { books: () => books },
}

// const kitty = new Cat({ name: 'Zildjian' })
// kitty.save().then(() => console.log('meow'))

module.exports = resolvers
