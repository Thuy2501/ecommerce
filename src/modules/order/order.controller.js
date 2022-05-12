const {
  orderModel,
  orderDetailsModels,
  categoryModel,
  flashsaleItemModel,
  flashsaleModel
} = require('../index')
const { productModel } = require('../product/product.model')
const { voucherModel } = require('../voucher/voucher.model')
const { Op, where } = require('sequelize')

const orderController = {
  getOrderAll: async (req, res) => {
    try {
      const orders = await orderModel.findAll({ raw: true })

      res.send(orders)
    } catch (error) {
      res.status(500).json({ error: 'error' })
    }
  },
  getOrderByIdUser: async (req, res) => {
    try {
      const { limit, page } = req.query
      // const orders = await userModel.findOne({
      //   include: {
      //     model: orderModel,
      //     as: 'orders',
      //     include: {
      //       model: orderDetailsModels,
      //       as: 'order_details',
      //       include: {
      //         model: productModel,
      //         as: 'products'
      //       }
      //     }
      //   },
      //   where: { id: req.user.id },
      //   limit: Number(limit),
      //   offset: Number(page - 1) * Number(limit),
      //   order: [['created_at', 'DESC']],
      //   raw: true
      // })

      const user_order = await orderModel.findOne({
        include: {
          model: orderDetailsModels,
          as: 'order_details',
          include: {
            model: productModel,
            as: 'products'
          }
        },
        where: { id_user: req.user.id }
      })
      delete user_order.dataValues['password']
      res.send(user_order)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'error' })
    }
  },
  getOrderByIdOrder: async (req, res) => {
    try {
      const order = await orderModel.findOne({
        include: {
          model: orderDetailsModels,
          as: 'order_details',
          include: {
            model: productModel,
            as: 'products'
          }
        },
        where: { id: req.params.id }
      })
      res.status(200).json({
        order
      })
    } catch (error) {
      res.status(500).json({ error: 'error' })
    }
  },

  postOrder: async (req, res) => {
    try {
      let { order_details, name, phone, address, voucher_id } = req.body

      if (!order_details.length) {
        return res.status(400).json({ msg: 'order_details empty' })
      }

      //lấy money của order detail
      for (od of order_details) {
        //lấy giá của gốc của sp trong order detail
        const product = await productModel.findOne({
          include: {
            model: categoryModel,
            as: 'categorys',
            where: { status: true }
          },
          attributes: ['price', 'quantity'],
          where: { id: od.id_product },
          raw: true
        })

        //check sp tồn tại?
        if (!product) {
          return res.status(401).json({ msg: 'This product does not exist' })
        }

        //update quantity product
        const up_quantity_product = await productModel.update({
          quantity: product.quantity - 1
        },{where: {id:product.id}}
        )

        //check sp trong flashsale?
        const check_flashsale = await flashsaleItemModel.findOne({
          include: {
            model: flashsaleModel,
            as: flashsaleModel.tableName,
            where: {
              start_time: {
                [Op.lt]: new Date()
              },
              end_time: {
                [Op.gt]: new Date()
              }
            }
          },
          where: {
            id_product: od.id_product,
            quantity: {
              [Op.gte]: 0
            }
          },
          raw: true
        })

        //xét giá sp
        if (check_flashsale) {
          od.price =
            product.price - (product.price * check_flashsale.discount) / 100

          //update qualyty của flashsaleItem
          const up_quantity_flashsaleItem = await flashsaleItemModel.update(
            { quantity: check_flashsale.quantity - 1 },
            {
              where: { id: check_flashsale.id }
            }
          )
        } else {
          od.price = product.price
        }
      }

      //check voucher tính tiền trong order
      if (voucher_id) {
        const voucher = await voucherModel.findOne({
          where: {
            id: voucher_id,
            start_time: {
              [Op.lt]: new Date()
            },
            end_time: {
              [Op.gt]: new Date()
            },
            quantity: {
              [Op.gte]: 0
            }
          },
          raw: true
        })
        if (!voucher) {
          return res.status(400).json({
            msg: 'This voucher code cannot be found. It may have been entered wrongly, in the wrong input bar, or is no longer in use.'
          })
        }

        //update voucher
        const up_quantity = voucher.quantity - 1
        const up_quantity_voucher = await voucherModel.update(
          { quantity: up_quantity },
          {
            where: { id: voucher.id }
          }
        )

        const total_money_details = order_details.reduce(
          (a, b) => a + b.price * b.qty,
          0
        )

        total_money = total_money_details - voucher.value
        if (total_money < 0) {
          total_money = 0
        }
      } else {
        total_money = order_details.reduce((a, b) => a + b.price * b.qty, 0)
      }

      //tạo order
      const order = await orderModel.create({
        id_user: req.user.id,
        name,
        total_money: total_money.toFixed(2),
        phone,
        address,
        voucher_id
      })

      //tạo order-detail
      const order_details_array = []
      for (oddt of order_details) {
        const od = await orderDetailsModels.create({
          order_id: order.id,
          ...oddt
        })
        order_details_array.push(od)
      }

      res.status(200).json({
        order: order.get({ plain: true }),
        order_details: order_details_array
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error })
    }
  },

  updateOrder: async (req, res) => {
    try {
      const { name, phone, address } = req.body
      const order = await orderModel.update(
        { name, phone, address },
        {
          where: { id: req.params.id }
        }
      )
      if (order) res.status(200).json({ message: 'update a order' })
    } catch (error) {
      res.status(500).json({ error: 'error' })
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const id_order = await orderModel.findOne({
        where: { id: req.params.id }
      })

      if (!id_order) return res.status(400).json({ msg: 'id không tồn tại' })

      await orderDetailsModels.destroy({
        where: { order_id: req.params.id }
      })

      await orderModel.destroy({
        where: { id: req.params.id }
      })
      res.status(500).json({ mes: 'delete success' })
    } catch (error) {
      res.status(500).json({ error: 'error' })
    }
  }
}

module.exports = orderController
