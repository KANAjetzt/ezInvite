const userSchema = require('./api/user/userSchema')
const eventSchema = require('./api/event/eventSchema')
const todoSchema = require('./api/todo/todoSchema')

const typeDefs = [userSchema, eventSchema, todoSchema]

module.exports = typeDefs
