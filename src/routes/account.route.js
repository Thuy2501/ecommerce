const express = require('express')
const account = express.Router()
const { validation, auth, authRole } = require('../middleware/index')
const accountController = require('../modules/user/account.controller')
const ROLE = require('../contains/role')

account.post(
  '/register',
  validation('validation_register'),
  accountController.register
)

account.get('/verify/:token', accountController.verify)

account.post(
  '/login',
  validation('validation_register'),
  accountController.login
)

account.post('/refresh-token', auth, accountController.generateAccessToken)

account.put(
  '/change-password',
  validation('validation_changePassword'),
  auth,
  accountController.changePassword
)

account.put('/reset-password', accountController.resetPassword)

account.put(
  '/update-admin',
  auth,
  validation('validation_updateUser'),
  accountController.updateAccount
)

account
  .route('/')
  .get(auth, accountController.getAccount)
  .put(
    auth,
    validation('validation_updateUser'),
    accountController.updateAccount
  )

module.exports = account
