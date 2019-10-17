const gql = require('graphql-tag')

const todoSchema = gql`
  type Todo {
    id: ID!
    widget: ID!
    users: [User]
    text: String!
    requiredPersons: Int
  }

  extend type Query {
    todos: [Todo!]!
    todo(id: ID!): Todo!
    todosForWidget(id: ID!): [Todo]
  }

  extend type Mutation {
    createTodo(
      widget: ID!
      text: String!
      requiredPersons: Int
      users: [ID]
    ): Todo!
    updateTodo(id: ID!, text: String, requiredPersons: Int, users: [ID]): Todo!
    deleteTodo(id: ID!): Todo
    addUserToTodo(id: ID!, user: ID!): Todo!
    removeUserFromTodo(id: ID!, user: ID!): Todo!
  }
`

module.exports = todoSchema
