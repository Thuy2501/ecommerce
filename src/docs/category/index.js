const getCategorys = require('./get-categorys')
const getProductCategorys = require('./get-product_category')
const createCategory = require('./create-category')
const updateCategory = require('./update-categorys')
const deleteProduct = require('./delete-categorys')

module.exports = {
  '/categorys': {
    ...getCategorys,
    ...createCategory
  },
  '/categorys/{id}': {
    ...getProductCategorys,
    ...updateCategory
    //     ...deleteProduct
  }
}