const express = require('express')
const category = express.Router()
const categoryController = require('../modules/category/category.controller')
const { auth, authRole, validation } = require('../middleware/index')
const upload = require('../middleware/upload')

category
  .route('/')
  .get(categoryController.getCategorys)
  .post(
    upload.fields([{ name: 'banner', maxCount: 1 }]),
    categoryController.postCategory
)


category
  .route('/:id')
  .get(categoryController.getProductOfCategoryById)
  .put(
    upload.fields([{ name: 'banner', maxCount: 1 }]),
    categoryController.updateCategory
  )
  
module.exports = category