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

const validation_updateAdmin = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] }
    })
    .required(),
  role: Joi.any().valid('user', 'admin')
})

const validation_updateUser = Joi.object({
  username: Joi.string().max(20)
})

const validation_createUser = Joi.object({
  username: Joi.string().max(20),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] }
    })
    .required(),
  password: Joi.string().min(6).max(30).required(),
  role: Joi.any().valid('user', 'admin'),
})

module.exports = {
  validation_register,
  validation_updateUser,
  validation_updateAdmin,
  validation_createUser
}