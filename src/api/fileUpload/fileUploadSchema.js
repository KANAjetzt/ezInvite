const gql = require('graphql-tag')

const fileUploadSchema = gql`
  scalar Upload
`

module.exports = fileUploadSchema
