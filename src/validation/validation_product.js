const Joi = require('joi')

const validation_createProduct = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(0),
  import_price: Joi.number().min(0),
  description: Joi.string(),
  barcode: Joi.number().min(0),
  quantity: Joi.number().min(0),
  img: Joi.string(),
  img_detail: Joi.string()
})
  
const validation_updateProduct = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(0),
  import_price: Joi.number().min(0),
  description: Joi.string(),
  barcode: Joi.number().min(0),
  quantity: Joi.number().min(0),
  img: Joi.string(),
  img_detail: Joi.string()
})

module.exports = { validation_createProduct, validation_updateProduct }