const merge = require('lodash/merge')

const userResolvers = require('./api/user/userResolvers')
const eventResolvers = require('./api/event/eventResolvers')
const todoResolvers = require('./api/todo/todoResolvers')
const feedbackResolver = require('./api/feedback/feedbackResolver')
const fileUploadResolvers = require('./api/fileUpload/fileUploadResolvers')

const resolvers = merge(
  userResolvers,
  eventResolvers,
  todoResolvers,
  feedbackResolver,
  fileUploadResolvers
)

module.exports = resolvers
