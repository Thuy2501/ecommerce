const express = require('express')
const account = express.Router()
const {validation,auth,authRole} = require('../middleware/index')
const accountController = require('../modules/user/account.controller')
const ROLE = require('../contains/role')


account.post(
  '/register',
  validation('validation_register'),
  accountController.register
)

account.get('/verify/:token', accountController.verify)

account.post('/login', validation('validation_register'), accountController.login)

account.post('/refresh-token', auth, accountController.generateAccessToken)

account.post('/change-password', auth, accountController.changePassword)

account.post('/reset-password', accountController.resetPassword)

account.post(
  '/update-admin',
  auth,
  authRole([ROLE.ADMIN]),
  validation('validation_updateAdmin'),
  accountController.updateAdmin
)

module.exports = account