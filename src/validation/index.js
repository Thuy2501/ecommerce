const {
  validation_register,
  validation_updateUser,
  validation_createUser,
  validation_updateAdmin
} = require('./validation_user')
const {
  validation_createProduct,
  validation_updateProduct
} = require('./validation_product')
const { validation_updateOrderDetails } = require('./validation_orderDetail')
const { validation_createOrder } = require('./validation_order')
const { validation_createVoucher } = require('./validation_voucher')
const {
  validation_createCategory,
  validation_updateCategory
} = require('./validation_category')

module.exports = {
  validation_register,
  validation_updateUser,
  validation_updateAdmin,
  validation_createUser,
  validation_createProduct,
  validation_updateProduct,
  validation_createOrder,
  validation_updateOrderDetails,
  validation_createVoucher,
  validation_createCategory,
  validation_updateCategory
}
