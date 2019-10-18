const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const expressPlayground = require('graphql-playground-middleware-express')
  .default
const { makeExecutableSchema } = require('graphql-tools')
const cors = require('cors')

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

const app = express()

// Implement Cors
app.use(cors())

// Complex requests --> everything that is not get / post, or sends custom headers or cookies.  )
app.options('*', cors())

// Serving static files
app.use(express.static(path.join(__dirname, 'public')))
console.log(path.join(__dirname, 'public'))

// Developtment logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

// The GraphQL endpoint
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(request => ({
    schema,
    context: { request },
  }))
)

// GraphQL Playground, a visual editor for queries
app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

module.exports = app
