const { GraphQLUpload } = require('graphql-upload')
const { uploadOne } = require('../resolverFactory')

const fileUploadResolvers = {
  Upload: GraphQLUpload,

  Mutation: {
    singleUpload(_, { file }) {
      uploadOne(_, file)
    },
  },
}

module.exports = fileUploadResolvers
