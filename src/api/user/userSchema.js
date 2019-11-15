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

  type CreateUserPayload {
    user: User!
  }

  type CreateUsersPayload {
    users: [User]!
  }

  input CreateUserInput {
    name: String!
    event: ID!
    photo: String
  }

  input CreateUsersInput {
    users: [CreateUserInput]!
  }

  type Mutation {
    createUser(input: CreateUserInput!): CreateUserPayload!
    createUsers(input: CreateUsersInput!): CreateUsersPayload!
    updateUser(id: ID!, name: String, photo: String): User!
    toggleUserAccepted(id: ID!, accepted: Boolean): User!
  }
`

module.exports = userSchema
