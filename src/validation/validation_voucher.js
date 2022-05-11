const Joi = require('joi')

const validation_createVoucher = Joi.object({
  code: Joi.string().required(),
  quantity: Joi.number().min(0),
  value: Joi.number().min(0),
  status: Joi.string(),
  start_time: Joi.date().greater(Date.now()),
  end_time: Joi.date().greater(Date.now())
})

const validation_updateVoucher = Joi.object({
  code: Joi.string().required(),
  quantity: Joi.number().min(0),
  value: Joi.number().min(0),
  status: Joi.string(),
  start_time: Joi.date(),
  end_time: Joi.date()
})

module.exports = { validation_createVoucher, validation_updateVoucher }
