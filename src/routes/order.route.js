const express = require('express')
const order = express.Router()
const {auth,authRole,validation} = require('../middleware/index')
const orderController = require('../modules/order/order.controller')
const ROLE = require('../contains/role')

order.get('/all', auth, authRole([ROLE.ADMIN]), orderController.getOrderAll)

order.get('/',auth, orderController.getOrderByIdUser)
order.post(
  '/',
  auth,
  validation('validation_createOrder'),
  orderController.postOrder
)

order
  .route('/:id')
  .get(auth, orderController.getOrderByIdOrder)
  .put(
    auth,
    authRole([ROLE.ADMIN]),
    validation('validation_createOrder'),
    orderController.updateOrder
  )
  .delete(auth, authRole([ROLE.ADMIN]), orderController.deleteOrder)

module.exports = order