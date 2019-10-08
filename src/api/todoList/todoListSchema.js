const gql = require('graphql-tag')

const todoListSchema = gql`
  type TodoList {
    id: ID!
    widgetId: ID!
  }

  extend type Query {
    todoLists: [TodoList!]!
  }

  extend type Mutation {
    createTodoList(widgetId: ID!): TodoList!
  }
`

module.exports = todoListSchema
