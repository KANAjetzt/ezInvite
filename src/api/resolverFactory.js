const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

exports.createOne = async (Model, body) => await Model.create(body)

exports.updateOne = async (Model, body) =>
  await Model.findByIdAndUpdate(body.id, body, {
    new: true,
    runValidators: true,
  })

exports.deleteOne = async (Model, id) => await Model.findByIdAndRemove(id)
exports.findOne = async (Model, id) => await Model.findById(id)
exports.findAll = async Model => await Model.find()

exports.uploadOne = async (Model, file, config = {}) => {
  const { stream, filename, mimetype, encoding } = await file
  console.log(filename)
  // Configure upload to Cloudinary
  const uploadStream = await cloudinary.uploader.upload_stream(config, function(
    err,
    image
  ) {
    console.log()
    console.log('** Stream Upload')
    if (err) {
      console.log(err)
    }
    console.log('* Same image, uploaded via stream')
    console.log(`${image.public_id ? image.public_id : ''}`)
    console.log(`${image.url ? image.url : ''}`)
  })

  // Init upload stream to Cloudinary
  stream.pipe(uploadStream)

  // Save Img URL to Databse

  return { filename, mimetype, encoding }
}

exports.uploadMultiple = async (Model, file, config = {}) => {
  const { stream, filename, mimetype, encoding } = await file
  console.log(filename)
  // Configure upload to Cloudinary
  const uploadStream = await cloudinary.uploader.upload_stream(config, function(
    err,
    image
  ) {
    console.log()
    console.log('** Stream Upload')
    if (err) {
      console.log(err)
    }
    console.log('* Same image, uploaded via stream')
    console.log(`${image.public_id ? image.public_id : ''}`)
    console.log(`${image.url ? image.url : ''}`)
  })

  // Init upload stream to Cloudinary
  stream.pipe(uploadStream)

  // Save Img URL to Databse

  return { filename, mimetype, encoding }
}
