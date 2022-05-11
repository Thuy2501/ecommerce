const express = require('express')
const user = express.Router()
const userController = require('../modules/user/user.controller')
const { auth, authRole, validation } = require('../middleware/index')
const ROLE = require('../contains/role')

user
  .route('/')
  .get(auth, authRole([ROLE.ADMIN]), userController.getUser)
  .post(
    auth,
    validation('validation_createUser'),
    authRole([ROLE.ADMIN]),
    userController.postUser
  )

user
  .route('/:id')
  .get(auth, userController.getUserById)
  .put(auth, validation('validation_updateUser'), userController.updateUser)
  .delete(auth, authRole([ROLE.ADMIN]), userController.deleteUser)

module.exports = user
