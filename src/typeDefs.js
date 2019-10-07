const userSchema = require('./api/user/userSchema')
const eventSchema = require('./api/event/eventSchema')

const typeDefs = [userSchema, eventSchema]

module.exports = typeDefs
