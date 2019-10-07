const merge = require('lodash/merge')

const userResolvers = require('./api/user/userResolvers')
const eventResolvers = require('./api/event/eventResolvers')

const resolvers = merge(userResolvers, eventResolvers)

module.exports = resolvers
