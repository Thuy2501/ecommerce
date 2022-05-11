// const getOrders = require('./get-orders')
// const getOrder = require('./get-order')
const getFlashsaleTime = require('./get-flashsaleTime')
const createFlashsale = require('./create-flashsale')
// const updateOrder = require('./update-order')
// const deleteOrder = require('./delete-order')

module.exports = {
  '/flashsale': {
    ...getFlashsaleTime,
    ...createFlashsale
  }
  // '/orders/all': {
  //   ...getOrderAll
  // },
  // '/orders/{id}': {
  //   ...getOrder,
  //   ...updateOrder,
  //   ...deleteOrder
  // }
}