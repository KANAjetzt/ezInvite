const cloudinary = require('cloudinary').v2

const asyncForEach = require('../utils/asyncForEach')

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

exports.uploadOne = async (Model, id, file, config = {}) => {
  const img = await file
  console.log(img)

  // Init upload stream to Cloudinary
  img.createReadStream().pipe(
    // Configure upload to Cloudinary
    cloudinary.uploader.upload_stream(config, async function(err, image) {
      console.log()
      console.log('** Stream Upload')
      if (err) {
        console.log(err)
      }
      console.log(`${image.public_id ? image.public_id : ''}`)
      console.log(`${image.url ? image.url : ''}`)
      await Model.findByIdAndUpdate(
        id,
        { heroImg: image.url },
        {
          new: true,
          runValidators: true,
        }
      )
    })
  )
}

exports.uploadMultiple = async (Model, id, files, config = {}) => {
  const uploadedFiles = await Promise.all(files)
  console.log(uploadedFiles)

  let imgUrls = []

  const writeToDb = async () => {
    await Model.findByIdAndUpdate(
      id,
      { imgs: imgUrls },
      {
        new: true,
        runValidators: true,
      }
    )
  }

  // Init upload stream to Cloudinary
  uploadedFiles.forEach(img => {
    img.createReadStream().pipe(
      // Configure upload to Cloudinary
      cloudinary.uploader.upload_stream(config, async function(err, image) {
        console.log()
        console.log('** Stream Upload')
        if (err) {
          console.log(err)
        }
        console.log(`${image.public_id ? image.public_id : ''}`)
        console.log(`${image.url ? image.url : ''}`)
        imgUrls = [...imgUrls, image.url]

        console.log(imgUrls.length, uploadedFiles.length)
        console.log(imgUrls.length === uploadedFiles.length)
        if (imgUrls.length === uploadedFiles.length) writeToDb()
      })
    )
  })
}
