const fs = require('fs')
const { GraphQLUpload } = require('graphql-upload')
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const fileUploadResolvers = {
  Upload: GraphQLUpload,

  Mutation: {
    async singleUpload(_, { file }) {
      const { stream, filename, mimetype, encoding } = await file

      // 1. Validate file metadata.
      console.log(filename)
      // 2. Stream file contents into cloud storage:
      // https://nodejs.org/api/stream.html
      // cloudinary.uploader.upload(
      //   `${stream}`,
      //   {
      //     resource_type: 'image',
      //   },
      //   (error, result) => {
      //     console.log(error, result)
      //   }
      // )

      // Stream upload
      const uploadStream = cloudinary.uploader.upload_stream(
        { tags: 'basic_sample' },
        function(err, image) {
          console.log()
          console.log('** Stream Upload')
          if (err) {
            console.warn(err)
          }
          console.log('* Same image, uploaded via stream')
          console.log('* ' + image.public_id)
          console.log('* ' + image.url)
        }
      )

      stream.pipe(uploadStream)

      // 3. Record the file upload in your DB.
      // const id = await recordFile( … )

      return { filename, mimetype, encoding }
    },
  },
}

module.exports = fileUploadResolvers
