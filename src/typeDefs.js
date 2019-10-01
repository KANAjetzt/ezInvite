// The GraphQL schema in string form
const typeDefs = `
  type Query { 
    cats: [Cat!]!
  }
 
  type Cat {
    id: ID!
    name: String!
  }
  
  type Mutation {
    createCat(name: String!): Cat!
  }
`

module.exports = typeDefs
