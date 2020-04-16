const cloudinary = require('cloudinary').v2

const { myEmitter } = require('../utils/events')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

exports.createOne = async (Model, body) => await Model.create(body)

exports.updateOne = async (Model, body, id) =>
  await Model.findByIdAndUpdate(body.id ? body.id : id, body, {
    new: true,
    runValidators: true,
  })

exports.deleteOne = async (Model, id) => await Model.findByIdAndRemove(id)
exports.findOne = async (Model, id) => await Model.findById(id)
exports.findAll = async Model => await Model.find()

exports.uploadOne = async (file, config = {}) => {
  const img = await file

  // Front End Img Upload Stream --> Backend
  const imgStream = img.createReadStream()

  // Backend --> Cloudinary Upload Stream
  const cloudinaryStream = cloudinary.uploader.upload_stream(config, function(
    err,
    image
  ) {
    if (err) {
      console.log(err)
    } else {
      myEmitter.emit('uploaddone', {
        imgUrl: image.url.split('/')[image.url.split('/').length - 1],
      })
    }
  })

  // Promise Img Upload pipeline
  return new Promise((resolve, reject) => {
    imgStream
      .on('error', e => reject(e))
      .pipe(cloudinaryStream)
      .on('error', e => reject(e))
    myEmitter.on('uploaddone', e => resolve(e))
  })
}
