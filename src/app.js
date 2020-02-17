const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { graphqlExpress } = require('apollo-server-express')
const { graphqlUploadExpress } = require('graphql-upload')
const expressPlayground = require('graphql-playground-middleware-express')
  .default
const { makeExecutableSchema } = require('graphql-tools')
const cors = require('cors')
const rateLimit = require('express-rate-limit')

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

const app = express()

// Implement Cors
app.use(cors())

// Complex requests --> everything that is not get / post, or sends custom headers or cookies.  )
app.options('*', cors())

// Developtment logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Limit requests from 1 IP, to 100 per minute
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 1000,
  message: 'To many requests from this IP, please try again later!',
})
app.use('/graphql', limiter)

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

// The GraphQL endpoint
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  graphqlExpress(request => ({
    schema,
    context: { request },
  }))
)

// GraphQL Playground, a visual editor for queries
if (process.env.NODE_ENV === 'development') {
  app.get('/playground', expressPlayground({ endpoint: '/graphql' }))
}

module.exports = app
