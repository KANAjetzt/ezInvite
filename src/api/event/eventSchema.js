const gql = require('graphql-tag')

const eventSchema = gql`
  type Event {
    id: ID!
    name: String!
    startDate: String!
    endDate: String
    startTime: String
    endTime: String
    description: String
    heroImg: String
    imgs: [String]
    location: String
    widgets: [Widget]
    users: [ID]
  }

  type Widget {
    id: ID!
    type: String!
  }

  extend type Query {
    events: [Event!]!
    widgets: [Widget]
  }

  extend type Mutation {
    createEvent(
      name: String!
      startDate: String!
      endDate: String
      startTime: String
      endTime: String
      description: String
      heroImg: String
      imgs: [String]
      location: String
      widgetTypes: [String]
    ): Event!

    updateEvent(
      eventId: ID!
      name: String
      date: String
      startTime: String
      endTime: String
      description: String
      heroImg: String
      imgs: [String]
      location: String
      widgetTypes: [String]
    ): Event!

    deleteEvent(eventId: ID!): Event
  }
`

module.exports = eventSchema
