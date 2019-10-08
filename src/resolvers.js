const merge = require('lodash/merge')

const userResolvers = require('./api/user/userResolvers')
const eventResolvers = require('./api/event/eventResolvers')
const todoListResolvers = require('./api/todoList/todoListResolvers')
const todoResolvers = require('./api/todo/todoResolvers')

const resolvers = merge(
  userResolvers,
  eventResolvers,
  todoListResolvers,
  todoResolvers
)

module.exports = resolvers
