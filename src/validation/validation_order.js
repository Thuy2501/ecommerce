const Joi = require('joi')

const validation_createOrder = Joi.object({
  name: Joi.string(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  address: Joi.string(),
  order_details: Joi.array().items(
    Joi.object().keys({
      id_product: Joi.number().required(),
      qty: Joi.number().min(1).required()
    })
  ),
  voucher_id: Joi.number()
})

module.exports = {validation_createOrder}