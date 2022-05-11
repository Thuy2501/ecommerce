const express = require('express')
const order_details = express.Router()
const { auth, authRole,validation } = require('../middleware/index')
const ROLE = require('../contains/role')
const orderDetailsController = require('../modules/order_details/order_details.controller')

//admin
order_details
  .route('/')
  .get(auth, authRole([ROLE.ADMIN]),orderDetailsController.getOrderDetails)

//thêm id get
order_details
  .route('/:id')
  .get(auth, authRole([ROLE.ADMIN]), orderDetailsController.getOrderDetailsById)
  .put(
    auth,
    authRole([ROLE.ADMIN]),
    validation('validation_updateOrderDetails'),
    orderDetailsController.updateOrderDetails
  )
  .delete(
    auth,
    authRole([ROLE.ADMIN]),
    orderDetailsController.deleteOrderDetails
  )

  module.exports = order_details