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
    link: String
    editLink: String
    slug: String
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

  input QueryEventInput {
    id: ID
    link: String
    editLink: String
    slug: String!
  }

  input CreateLocationInput {
    coordinates: [Float!]!
    name: String
    address: String
    description: String
  }

  input CreateEventInput {
    name: String!
    startDate: String!
    endDate: String
    startTime: String
    endTime: String
    description: String
    heroImg: Upload
    imgs: Upload
    location: CreateLocationInput
    widgetTypes: [String]
  }

  type CreateEventPayload {
    event: Event!
  }

  input UpdateEventInput {
    id: ID!
    name: String
    startDate: String
    startTime: String
    endTime: String
    description: String
    heroImg: Upload
    imgs: Upload
    location: CreateLocationInput
    widgetTypes: [String]
  }

  type UpdateEventPayload {
    event: Event!
  }

  extend type Query {
    event(input: QueryEventInput!): Event!
    events: [Event!]!
    widgets: [Widget]
  }

  extend type Mutation {
    createEvent(input: CreateEventInput!): CreateEventPayload!
    updateEvent(input: UpdateEventInput!): UpdateEventPayload!

    deleteEvent(id: ID!): Event

    uploadHeroImg(file: Upload!): Event!
    uploadImgs(files: Upload!): Event!
  }
`

module.exports = eventSchema
