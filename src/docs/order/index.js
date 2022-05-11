const getOrders = require('./get-orders')
const getOrder = require('./get-order')
const getOrderAll = require('./get-orderAll')
const createOrder = require('./create-order')
const updateOrder = require('./update-order')
const deleteOrder = require('./delete-order')

module.exports = {
  '/orders': {
    ...getOrders,
    ...createOrder
  },
  '/orders/all': {
    ...getOrderAll
  },
  '/orders/{id}': {
    ...getOrder,
    ...updateOrder,
    ...deleteOrder
  }
}