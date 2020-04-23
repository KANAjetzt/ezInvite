const gql = require('graphql-tag')

const feedbackSchema = gql`
  type Feedback {
    id: ID!
    page: String!
    date: String!
  }

  type CreateFeedbackPayload {
    feedback: Feedback!
  }

  input CreateFeedbackInput {
    page: String!
    date: String!
  }

  extend type Query {
    feedback: [Feedback!]!
  }

  extend type Mutation {
    createFeedback(input: CreateFeedbackInput!): CreateFeedbackPayload!
  }
`

module.exports = feedbackSchema
