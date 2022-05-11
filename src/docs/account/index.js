const login = require('./login')
const register = require('./register')
const changePassword = require('./changePassword')
const resetPassword = require('./resetPassword')
const updateAdmin = require('./updateAdmin')
const refreshToken = require('./refreshToken')
const verify = require('./verify')

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
  '/account/update-admin': {
    ...updateAdmin
  },
  '/account/refresh-token': {
    ...refreshToken
  },
  '/account/verify/{token}': {
    ...verify
  }
}