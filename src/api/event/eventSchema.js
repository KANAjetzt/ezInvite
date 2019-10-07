const gql = require('graphql-tag')

/*
TODO: - Add a Date Range 12.12 - 14.12 z.B. 
*/

const eventSchema = gql`
  type Event {
    id: ID!
    name: String!
    date: String!
    startTime: String
    endTime: String
    description: String
    heroImg: String
    imgs: [String]
    location: String
    WidgetID: String
    userID: [String]
  }

  extend type Query {
    events: [Event!]!
  }

  extend type Mutation {
    createEvent(name: String!, date: String!): Event!
  }
`

module.exports = eventSchema
