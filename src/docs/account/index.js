const login = require('./login')
const register = require('./register')
const changePassword = require('./changePassword')
const resetPassword = require('./resetPassword')
const updateAccount = require('./update-account')
const refreshToken = require('./refreshToken')
const verify = require('./verify')
const getAccount = require('./get-account')

module.exports = {
  '/account/login': {
    ...login
  },
  '/account/register': {
    ...register
  },
  '/account/change-password': {
    ...changePassword
  },
  '/account/reset-password': {
    ...resetPassword
  },
  '/account': {
    ...updateAccount,
    ...getAccount
  },
  '/account/refresh-token': {
    ...refreshToken
  },
  '/account/verify/{token}': {
    ...verify
  },

}