const merge = require('lodash/merge')

const userResolvers = require('./api/user/userResolvers')
const eventResolvers = require('./api/event/eventResolvers')
const widgetResolvers = require('./api/widget/widgetResolvers')
const todoListResolvers = require('./api/todoList/todoListResolvers')
const todoResolvers = require('./api/todo/todoResolvers')

const resolvers = merge(
  userResolvers,
  eventResolvers,
  widgetResolvers,
  todoListResolvers,
  todoResolvers
)

module.exports = resolvers
