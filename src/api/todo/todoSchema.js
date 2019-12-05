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

  type CreateTodoPayload {
    todo: Todo!
  }

  type AddUserToTodoPayload {
    todo: Todo!
  }

  input CreateTodoInput {
    widget: ID!
    text: String!
    requiredPersons: Int
    users: [ID]
  }

  input AddUserToTodoInput {
    id: ID!
    user: ID!
  }

  extend type Mutation {
    createTodo(input: CreateTodoInput!): CreateTodoPayload!
    updateTodo(id: ID!, text: String, requiredPersons: Int, users: [ID]): Todo!
    deleteTodo(id: ID!): Todo
    addUserToTodo(input: AddUserToTodoInput!): AddUserToTodoPayload!
    removeUserFromTodo(id: ID!, user: ID!): Todo!
  }
`

module.exports = todoSchema
