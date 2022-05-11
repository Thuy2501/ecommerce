const getOrderDetails = require('./get-orderDetails')
const getOrderDetail = require('./get-orderDetail')
const createOrderDetail = require('./create-orderDetail')
const updateOrderDetail = require('./update-orderDetail')
const deleteOrderDetail = require('./delete-orderDetail')

module.exports = {
  '/order-details': {
    ...getOrderDetails
  },
  '/order-details/{id}': {
    ...getOrderDetail,
    ...updateOrderDetail,
    ...deleteOrderDetail
  }
}