const gql = require('graphql-tag')

const widgetSchema = gql`
  type Widget {
    id: ID!
    type: String!
  }

  extend type Query {
    widgets: [Widget!]!
  }
`

module.exports = widgetSchema
