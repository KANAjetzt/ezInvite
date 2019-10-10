exports.createOne = async (Model, body) => await Model.create(body)

exports.updateOne = async (Model, body) =>
  await Model.findByIdAndUpdate(body.id, body, {
    new: true,
    runValidators: true,
  })

exports.deleteOne = async (Model, id) => await Model.findByIdAndRemove(id)

exports.findOne = async (Model, id) => await Model.findById(id)
exports.findAll = async Model => await Model.find()
