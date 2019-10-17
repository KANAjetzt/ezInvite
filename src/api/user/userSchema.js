const gql = require('graphql-tag')

const userSchema = gql`
  type Query {
    user(id: ID!): User!
    users: [User!]!
  }

  type User {
    id: ID!
    name: String!
    photo: String
    accepted: Boolean
    link: String
    events: [ID!]
  }

  type Mutation {
    createUser(name: String!, event: ID!, photo: String): User!
    updateUser(id: ID!, name: String, photo: String): User!
    toggleUserAccepted(id: ID!, accepted: Boolean): User!
  }
`

module.exports = userSchema
