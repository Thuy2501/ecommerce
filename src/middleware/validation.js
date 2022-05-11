const createHttpError = require('http-errors')
const test = require('../validation/index')


function validation (validator) {
  // If validator is not exist, throw an error
  if (!test.hasOwnProperty(validator)) {
    throw new Error(`'${validator}' validator is not exist`)
  }

  return async function (req, res, next) {
    try {
      const validated = await test[validator].validateAsync(req.body)
      req.body = validated
      next()
    } catch (err) {
      if (err.isJoi) return next(createHttpError(422, { message: err.message }))
      next(createHttpError(500))
    }
  }
}

module.exports = { validation }