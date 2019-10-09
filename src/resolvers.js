const merge = require('lodash/merge')

const userResolvers = require('./api/user/userResolvers')
const eventResolvers = require('./api/event/eventResolvers')
const todoResolvers = require('./api/todo/todoResolvers')

const resolvers = merge(userResolvers, eventResolvers, todoResolvers)

module.exports = resolvers
