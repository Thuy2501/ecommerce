const Joi = require('joi')

const validation_updateOrderDetails = Joi.object({
  qty: Joi.number().min(1)
})

module.exports = { validation_updateOrderDetails }