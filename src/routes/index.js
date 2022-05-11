const router = require('express').Router()
const user = require('./user.route')
const account = require('./account.route')
const product = require('./product.route')
const order = require('./order.route')
const order_details = require('./order_details.route')
const voucher = require('./voucher.route')
const category = require('./category.route')
const flashsale = require('./flashsale.route')
const flashsale_item = require('./flashsale_item.route')


router.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

router.use('/users', user)
router.use('/account', account)
router.use('/products', product)
router.use('/orders', order)
router.use('/order-details', order_details)
router.use('/vouchers', voucher)
router.use('/categorys', category)
router.use('/flashsale', flashsale)
router.use('/flashsale_item', flashsale_item)

module.exports = router