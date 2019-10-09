const gql = require('graphql-tag')

const todoSchema = gql`
  type Todo {
    id: ID!
    todoListId: ID!
    users: [ID]
    text: String!
    requiredPersons: Int
  }

  extend type Query {
    todos: [Todo!]!
  }

  extend type Mutation {
    createTodo(widget: ID!, text: String!, requiredPersons: Int): Todo!
    updateTodo(id: ID!, text: String, requiredPersons: Int, users: [ID]): Todo!
    deleteTodo(id: ID!): Todo
  }
`

module.exports = todoSchema
