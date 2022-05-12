const { sequelizeConnect } = require('../config/index')

/**Declare models */
const { userModel } = require('./user/user.model')
const { productModel } = require('./product/product.model')
const { categoryModel } = require('./category/category.model')
const { orderModel } = require('../modules/order/order.model')
const { voucherModel } = require('./voucher/voucher.model')
const { flashsaleModel } = require('./flashsale/flashsale.model')
const {
  orderDetailsModels
} = require('../modules/order_details/order_details.model')

const {flashsaleItemModel} = require('./flashsaleItems/flashsaleItem.model')


userModel.hasMany(orderModel, {
  foreignKey: 'id_user',
  as: orderModel.tableName
})

//product-orderDetail
productModel.hasMany(orderDetailsModels, {
  foreignKey: 'id_product',
  as: orderDetailsModels.tableName
})

orderDetailsModels.belongsTo(productModel, {
  foreignKey: 'id_product',
  as: productModel.tableName
})

//order-orderDetails
orderModel.hasMany(orderDetailsModels, {
  foreignKey: 'order_id',
  as: orderDetailsModels.tableName
})
orderDetailsModels.belongsTo(orderModel, {
  foreignKey: 'id',
  as: orderModel.tableName
})

//voucher-order
voucherModel.hasMany(orderModel, {
  foreignKey: 'voucher_id',
  as: orderModel.tableName
})

orderModel.belongsTo(voucherModel, {
  foreignKey: 'id',
  as: voucherModel.tableName
})

//category-product
productModel.belongsTo(categoryModel, {
  foreignKey: 'id',
  as: categoryModel.tableName
})

categoryModel.hasMany(productModel, {
  foreignKey: 'id_category',
  as: productModel.tableName
})

// product-flashsaleItem
productModel.hasMany(flashsaleItemModel, {
  foreignKey: 'id_product',
  as: flashsaleItemModel.tableName
})

flashsaleItemModel.belongsTo(productModel, {
  foreignKey: 'id_product',
  as: productModel.tableName
})

//flashsale-flashsaleItem
flashsaleModel.hasMany(flashsaleItemModel, {
  foreignKey: 'id_flashsale',
  as: flashsaleItemModel.tableName
})

flashsaleItemModel.belongsTo(flashsaleModel, {
  foreignKey: 'id_flashsale',
  as: flashsaleModel.tableName
})

/**Synchronize */
sequelizeConnect
  .sync({ alter: true })
  .then((result) => {
    console.log('!!SQL sync completed!!')
  })
  .catch((error) => {
    console.log(error)
  })

module.exports = {
  userModel,
  productModel,
  categoryModel,
  orderDetailsModels,
  orderModel,
  voucherModel,
  flashsaleModel,
  flashsaleItemModel
}