const gql = require('graphql-tag')

const todoListSchema = gql`
  type TodoList {
    id: ID!
    widget: String!
  }

  extend type Query {
    todoLists: [TodoList!]!
  }
`

module.exports = todoListSchema
