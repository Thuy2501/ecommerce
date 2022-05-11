const { productModel, voucherModel } = require('../index')

const { Op } = require('sequelize')

const productController = {
  getVoucher: async (req, res) => {
    try {      
      const { limit, page, code, valueMin, valueMax } = req.query
      
      if (
        typeof code === 'undefined' &&
        typeof valueMin === 'undefined' &&
        typeof valueMax === 'undefined'
      ) {
        const vouchers = await voucherModel.findAndCountAll({
          limit: Number(limit),
          offset: Number(page - 1) * Number(limit),
          order: [['created_at', 'DESC']],
          raw: true
        })
        return res.send(vouchers)
      }

      const voucher = await voucherModel.findAndCountAll({
        where: {
          [Op.or]: [
            {
              code: {
                [Op.substring]: `${code}`
              }
            },
            {
              value: {
                [Op.between]: [valueMin, valueMax]
              }
            }
          ]
        },
        limit: Number(limit),
        offset: Number(page - 1) * Number(limit),
        order: [['created_at', 'DESC']],
        raw: true
      })
      return res.send(voucher)
    } catch (error) {
      console.log('error', error)
      res.status(500).json({ error: error })
    }
  },

  getVoucherById: async (req, res) => {
    try {
      const voucher = await voucherModel.findOne({
        where: { id: req.params.id }
      })
      return res.send(voucher)
    } catch (error) {
      res.status(500).json({ error: 'error' })
    }
  },

  postVoucher: async (req, res) => {
    try {
      const { code, quantity, value, unit, start_time, end_time } = req.body

      const check_code = await voucherModel.findOne({ where: { code } })

      if (check_code)
        return res.status(400).json({ msg: 'code already exists' })

      const vouchers = await voucherModel.create({
        code,
        quantity,
        value,
        unit,
        start_time,
        end_time
      })

      res.status(200).json({ msg: 'post a vouchers', vouchers: vouchers })
    } catch (error) {
      console.log('---------',error)
      res.status(500).json({ error: 'error' })
    }
  },

  updateVoucher: async (req, res) => {
    try {
      const { code, quantity, value, status, start_time, end_time } = req.body
      const voucher = await voucherModel.update(
        { code, quantity, value, status, start_time, end_time },
        {
          where: { id: req.params.id }
        }
      )
      if (voucher)
        res.status(200).json({ msg: 'update a voucher', voucher: voucher })
    } catch (error) {
      res.status(500).json({ error: error })
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const order_id = await orderDetailsModels.findAll(
        {
          where: { id_product: req.params.id }
        },
        { row: true }
      )

      if (!order_id.length) {
        res.status(400).json({
          msg: 'The product already exists in the order table'
        })
      }

      await productModel.destroy({
        where: { id: req.params.id }
      })
      res.status(200).json({ mes: 'delete success' })
    } catch (error) {
      res.status(500).json({ error: 'error' })
    }
  }
}

module.exports = productController
