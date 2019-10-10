const gql = require('graphql-tag')

const userSchema = gql`
  type Query {
    users: [User!]!
  }

  type User {
    id: ID!
    name: String!
    photo: String
    accapted: Boolean
    link: String
    events: [ID!]
  }

  type Mutation {
    createUser(name: String!, event: ID!, photo: String): User!
  }
`

module.exports = userSchema
