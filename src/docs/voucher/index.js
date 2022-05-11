const createVoucher = require('./create-voucher');
const getVouchers = require('./get-vouchers')
// const createProduct = require('./create-product')
const updateVoucher = require('./update-voucher')
// const deleteProduct = require('./delete-product')
const img = require('./img')

module.exports = {
  '/vouchers': {
    ...createVoucher,
    ...getVouchers
  },
  '/vouchers/{id}': {
    ...updateVoucher
    // ...deleteProduct
  },
  '/post': {
    ...img
  }
}