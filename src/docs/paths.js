
const users = require('../docs/users')
const account = require('../docs/account')
const product = require('../docs/product')
const order = require('../docs/order')
const orderDetails = require('../docs/order_details')
const voucher = require('../docs/voucher')
const category = require('../docs/category')
const flashsale = require('../docs/flashsale')
const flashsaleItem = require('../docs/flashsaleItem')

module.exports = {
  paths: {
    ...account,
    ...users,
    ...product,
    ...order,
    ...orderDetails,
    ...voucher,
    ...category,
    ...flashsale,
    ...flashsaleItem
  }
}