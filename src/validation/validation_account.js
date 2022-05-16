const Joi = require('joi')

const validation_register = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] }
    })
    .required(),
  password: Joi.string().min(6).max(30).required()
})

const validation_updateUser = Joi.object({
  username: Joi.string().max(20)
})

const validation_changePassword = Joi.object({
  old_password: Joi.string().min(6).max(30).required(),
  new_password: Joi.string().min(6).max(30).required()
})

module.exports = {
  validation_register,
  validation_changePassword,
  validation_updateUser
}
