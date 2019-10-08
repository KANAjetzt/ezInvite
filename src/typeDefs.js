const userSchema = require('./api/user/userSchema')
const eventSchema = require('./api/event/eventSchema')
const todoListSchema = require('./api/todoList/todoListSchema')
const todoSchema = require('./api/todo/todoSchema')

const typeDefs = [userSchema, eventSchema, todoListSchema, todoSchema]

module.exports = typeDefs
