// const getOrders = require('./get-orders')
// const getOrder = require('./get-order')
const getFlashsaleTime = require('./get-flashsaleTime')
const createFlashsale = require('./create-flashsale')
const updateFlashsale = require('./update_flashsale')
// const deleteOrder = require('./delete-order')

module.exports = {
  '/flashsale': {
    ...getFlashsaleTime,
    ...createFlashsale
  },
  // '/orders/all': {
  //   ...getOrderAll
  // },
  '/flashsale/{id}': {
    ...updateFlashsale
  }
}