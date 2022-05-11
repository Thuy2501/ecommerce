const Joi = require('joi')

const validation_createCategory = Joi.object({
  name: Joi.string().required(),
  status: Joi.number().min(0),
  banner: Joi.string(),
  index: Joi.string()
})

const validation_updateCategory = Joi.object({
  name: Joi.string().required(),
  status: Joi.number().min(0),
  banner: Joi.string(),
  index: Joi.string()
})

module.exports = { validation_createCategory, validation_updateCategory }