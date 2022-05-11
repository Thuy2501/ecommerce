const express = require('express')
const voucher = express.Router()
const { auth, authRole, validation } = require('../middleware/index')
const voucherController = require('../modules/voucher/voucher.controller')
const ROLE = require('../contains/role')

voucher
  .route('/')
  .get( voucherController.getVoucher)
  .post(
    // auth,
    validation('validation_createVoucher'),
    voucherController.postVoucher
  )
  

voucher.put(
  '/:id',
  auth,
  validation('validation_createVoucher'),
  voucherController.updateVoucher
)

module.exports = voucher