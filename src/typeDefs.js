const userSchema = require('./api/user/userSchema')
const eventSchema = require('./api/event/eventSchema')
const todoSchema = require('./api/todo/todoSchema')
const feedbackSchema = require('./api/feedback/feedbackSchema')
const fileUploadSchema = require('./api/fileUpload/fileUploadSchema')

const typeDefs = [
  userSchema,
  eventSchema,
  todoSchema,
  feedbackSchema,
  fileUploadSchema,
]

module.exports = typeDefs
