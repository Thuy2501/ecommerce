const express = require('express')
const product = express.Router()
const productController = require('../modules/product/product.controller')
const { auth, validation, authRole } = require('../middleware/index')
const ROLE = require('../contains/role')
const upload = require('../middleware/upload')
product
  .route('/')
  .get(productController.getProduct)
  .post(
    // auth,
    // authRole([ROLE.ADMIN]),
    // validation('validation_createProduct'),
    upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'image_detail', maxCount: 5 }
    ]),
    // upload.array('image', 12),
    productController.postProduct
  )

product
  .route('/:id')
  .get(productController.getProductById)
  .put(
    // auth,
    // authRole([ROLE.ADMIN]),
    // validation('validation_createProduct'),
    upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'image_detail', maxCount: 5 }
    ]),
    productController.updateProduct
  )
  .delete(auth, authRole([ROLE.ADMIN]), productController.deleteProduct)

module.exports = product
