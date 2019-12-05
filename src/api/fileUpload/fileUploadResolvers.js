const { GraphQLUpload } = require('graphql-upload')

const fileUploadResolvers = {
  Upload: GraphQLUpload,
}

module.exports = fileUploadResolvers
