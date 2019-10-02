const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const expressPlayground = require('graphql-playground-middleware-express')
  .default
const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

const app = express()

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))

// GraphQL Playground, a visual editor for queries
app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

module.exports = app
