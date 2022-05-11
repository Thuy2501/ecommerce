const express = require('express')
const flashsaleItemsController = require('../modules/flashsaleItems/flashsaleItem.controller')
const flashsale_item = express.Router()

flashsale_item.route('/').post(flashsaleItemsController.postflashsaleItems)

module.exports = flashsale_item