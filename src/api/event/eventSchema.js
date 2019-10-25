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
    location: Location
    widgets: [Widget]
    users: [Users]
  }

  type Users {
    id: ID!
    name: String!
    photo: String
    accepted: Boolean
    link: String
  }

  type Widget {
    id: ID!
    type: String!
  }

  type Location {
    coordinates: [Float!]!
    name: String
    address: String
    description: String
  }

  input CreateLocationInput {
    coordinates: [Float!]!
    name: String
    address: String
    description: String
  }

  extend type Query {
    event(id: ID!): Event!
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
      location: CreateLocationInput
      widgetTypes: [String]
    ): Event!

    updateEvent(
      id: ID!
      name: String
      date: String
      startTime: String
      endTime: String
      description: String
      heroImg: String
      imgs: [String]
      location: CreateLocationInput
      widgetTypes: [String]
    ): Event!

    deleteEvent(id: ID!): Event

    uploadHeroImg(file: Upload!): Event!
    uploadImgs(file: Upload!): Event!
  }
`

module.exports = eventSchema
