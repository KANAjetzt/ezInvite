const gql = require('graphql-tag')

const userSchema = gql`
  type Query {
    user(id: ID!): User!
    userByLink(link: String!): User!
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

  type UpdateUserPayload {
    user: User!
  }

  type ToggleUserAcceptedPayload {
    user: User!
  }

  input CreateUserInput {
    name: String!
    event: ID!
    photo: String
  }

  input CreateUsersInput {
    users: [CreateUserInput]!
  }

  input UpdateUserInput {
    user: ID!
    name: String
    photo: Upload
  }

  input ToggleUserAcceptedInput {
    link: String
    accepted: Boolean
  }

  type Mutation {
    createUser(input: CreateUserInput!): CreateUserPayload!
    createUsers(input: CreateUsersInput!): CreateUsersPayload!
    updateUser(input: UpdateUserInput!): UpdateUserPayload!
    toggleUserAccepted(
      input: ToggleUserAcceptedInput!
    ): ToggleUserAcceptedPayload!
  }
`

module.exports = userSchema
