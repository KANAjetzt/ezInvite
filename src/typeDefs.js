const typeDefs = `
type Query { 
  users: [User!]!
}

type User {
  id: ID!
  name: String!
  photo: String
}

type Mutation {
  createUser(name: String!): User!
}
`
module.exports = typeDefs
