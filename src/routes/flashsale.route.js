const express = require('express')
const flashsale = express.Router()
const flashsaleController = require('../modules/flashsale/flashsale.controller')

flashsale
  .route('/')
  .post(flashsaleController.postFlashsale)
  .get(flashsaleController.getFlashsaleByTime)


  flashsale
    .route('/:id')
    .put(flashsaleController.updateflashsale)
    
module.exports = flashsale
