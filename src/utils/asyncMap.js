module.exports = async function asyncMap(array, callback) {
  const results = []

  for (const item of array) {
    results.push(await callback(item))
  }

  return results
}
