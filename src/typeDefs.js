const userSchema = require('./api/user/userSchema')
const eventSchema = require('./api/event/eventSchema')
const todoSchema = require('./api/todo/todoSchema')
const fileUploadSchema = require('./api/fileUpload/fileUploadSchema')

const typeDefs = [userSchema, eventSchema, todoSchema, fileUploadSchema]

module.exports = typeDefs
