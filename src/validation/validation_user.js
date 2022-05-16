const Joi = require('joi')



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

const validation_updateAdmin = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] }
    })
    .required(),
  username: Joi.string().max(20),
  role: Joi.any().valid('user', 'admin'),
  verify: Joi.boolean(),
  status: Joi.boolean()
})

module.exports = {
  validation_createUser,
  validation_updateAdmin
}