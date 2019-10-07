const merge = require('lodash/merge')

const userResolvers = require('./api/user/userResolvers')

const resolvers = merge(userResolvers)

module.exports = resolvers
