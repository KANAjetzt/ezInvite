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

  type CreateTodosPayload {
    todos: [Todo]!
  }

  type UpdateTodoPayload {
    todo: Todo!
  }

  type UpdateTodosPayload {
    todo: Todo!
  }

  type DeleteTodoPayload {
    success: Boolean!
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

  input CreateTodosInput {
    todos: [CreateTodoInput]
  }

  input UpdateTodoInput {
    id: ID!
    text: String
    requiredPersons: Int
    users: [ID]
  }

  input UpdateTodosInput {
    todos: [UpdateTodoInput]!
  }

  input DeleteTodoInput {
    id: ID!
  }

  input AddUserToTodoInput {
    id: ID!
    user: ID!
  }

  extend type Mutation {
    createTodo(input: CreateTodoInput!): CreateTodoPayload!
    createTodos(input: CreateTodosInput!): CreateTodosPayload!
    updateTodo(input: UpdateTodoInput!): UpdateTodoPayload!
    updateTodos(input: UpdateTodosInput!): UpdateTodosPayload!
    deleteTodo(input: DeleteTodoInput!): DeleteTodoPayload!
    addUserToTodo(input: AddUserToTodoInput!): AddUserToTodoPayload!
    removeUserFromTodo(id: ID!, user: ID!): Todo!
  }
`

module.exports = todoSchema
