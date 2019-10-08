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
    createTodo(todoListId: ID!, text: String!, requiredPersons: Int): Todo
  }
`

module.exports = todoSchema
