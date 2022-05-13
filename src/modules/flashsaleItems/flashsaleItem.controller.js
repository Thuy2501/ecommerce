const { flashsaleItemModel, productModel, categoryModel } = require('../index')
const { Op } = require('sequelize')

const flashsaleItemsController = {
  postflashsaleItems: async (req, res) => {
    try {
      const { discount, quantity, id_product, id_flashsale } = req.body

      //check product đã tồn tại trong flashsale này chưa
      const flashsaleItems = await flashsaleItemModel.findOne({
        where: {
          id_product: { [Op.eq]: id_product },
          id_flashsale: { [Op.eq]: id_flashsale }
        }
      })

      if (flashsaleItems) {
        return res.status(401).json({
          msg: 'The product is already available in this flash sale time frame'
        })
      }

      //check product có tồn tại hay không
      const check_product = await productModel.findOne({
        include: {
          model: categoryModel,
          as: 'categorys',
          where: { status: true }
        },
        where: { id: id_product, quantity: { [Op.gt]: 0 } }
      })

      if (!check_product) {
        return res.status(401).json({ msg: 'this product does not exist ' })
      }

      if (quantity > check_product.quantity) {
        return res.status(401).json({
          msg: 'quantity of flashsale must be less than or equal to quantity of product'
        })
      }

      const flashsaleItem = await flashsaleItemModel.create({
        discount,
        quantity,
        id_product,
        id_flashsale
      })

      //update quantity của product
      const update_quantity_product = check_product.quantity - quantity

      const update_product = await productModel.update(
        {
          quantity: update_quantity_product
        },
        { where: { id: id_product } }
      )

      return res.status(200).json({ check_product })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: error })
    }
  },
  updateflashsaleItems: async (req, res) => {
    try {
      const { discount, quantity, id_product, id_flashsale } = req.body

      const product = await productModel.update(
        {
          discount,
          quantity,
          id_product,
          id_flashsale
        },
        {
          where: { id: req.params.id }
        }
      )
      if (product)
        res.status(200).json({ msg: 'update a product', product: product })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error })
    }
  }
}

module.exports = flashsaleItemsController
