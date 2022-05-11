const express = require('express')
const flashsale = express.Router()
const flashsaleController = require('../modules/flashsale/flashsale.controller')

flashsale.route('/').post(flashsaleController.postFlashsale).get(flashsaleController.getFlashsaleByTime)

module.exports = flashsale