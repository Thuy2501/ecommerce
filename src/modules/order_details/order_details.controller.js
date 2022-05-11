const { orderDetailsModels, orderModel,productModel } = require('../index')

const orderDetailsController = {
  getOrderDetails: async (req, res) => {
    try {
      const order_details = await orderDetailsModels.findAll()
      res.send(order_details)
    } catch (error) {
      res.status(500).json({ error: 'error' })
    }
  },

  getOrderDetailsById: async (req, res) => {
    try {
      const order_detail = await orderDetailsModels.findOne({
        where: { id: req.params.id }
      })
     
      res.send(order_detail)
    } catch (error) {
      res.status(500).json({ error: 'error' })
    }
  },

  postOrderDetails: async (req, res) => {
    try {
      const { price, quantity, id_product, id_order } = req.body
      
      const order_detail = await orderDetailsModels.create(
        {
          price,
          quantity,
          id_product,
          id_order
        },
        {
          include: [
            {
              model: productModel,
              as: 'products'
            }
          ]
        }
      )

    } catch (error) {
      
    }
  },

  updateOrderDetails: async (req, res) => {
    try {
      const { qty } = req.body
      
      const order = await orderDetailsModels.update(
        { qty },
        {
          where: { id: req.params.id }
        }
      )

      const order_detail = await orderDetailsModels.findOne({
        where: { id: req.params.id },
        raw: true
      })

      const get_order = await orderDetailsModels.findAll({
        where: { order_id: order_detail.order_id },
        raw: true
      })

      const total_money = get_order.reduce((a, b) => a + b.price * b.qty, 0)

      await orderModel.update(
        { total_money },
        {
          where: { id: order_detail.order_id },
          raw: true
        }
      )

      if (order) res.status(200).json({ msg: 'update a order details' })
    } catch (error) {
      res.status(500).json({ error: 'error' })
    }
  },

  deleteOrderDetails: async (req, res) => {
    try {
      const order_detail = await orderDetailsModels.findOne({
        where: { id: req.params.id },
        raw: true
      })

      const up_order = order_detail.order_id 

      await orderDetailsModels.destroy({
        where: { id: req.params.id }
      })
      
      const get_order = await orderDetailsModels.findAll({
        where: { order_id: up_order },
        raw: true
      })

      if (!get_order.length) {
        await orderModel.destroy({
          where: { id: up_order }
        })
        return res.status(400).json({ msg: 'order_detail of order empty' })
      }

      const total_money = get_order.reduce((a, b) => a + b.price * b.qty, 0)
      
      await orderModel.update(
        { total_money },
        {
          where: { id: order_detail.order_id },
          raw: true
        }
      )

      res.status(200).json({ mes: 'delete success' })
    } catch (error) {
      res.status(500).json({ error: 'error' })
    }
  }
}

module.exports = orderDetailsController
