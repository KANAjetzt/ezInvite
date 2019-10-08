const gql = require('graphql-tag')

const todoSchema = gql`
  type Todo {
    id: ID!
    todoList: String!
    user: String
  }

  extend type Query {
    todos: [Todo!]!
  }
`

module.exports = todoSchema
