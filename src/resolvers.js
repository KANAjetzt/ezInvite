const merge = require('lodash/merge')

const userResolvers = require('./api/user/userResolvers')
const eventResolvers = require('./api/event/eventResolvers')
const todoResolvers = require('./api/todo/todoResolvers')
const fileUploadResolvers = require('./api/fileUpload/fileUploadResolvers')

const resolvers = merge(
  userResolvers,
  eventResolvers,
  todoResolvers,
  fileUploadResolvers
)

module.exports = resolvers
