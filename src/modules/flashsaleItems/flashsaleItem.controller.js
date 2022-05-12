const { flashsaleItemModel, productModel, categoryModel } = require('../index')
const { Op } = require('sequelize')

const flashsaleItemsController = {
  postflashsaleItems: async (req, res) => {
    try {
      const { discount, quantity, id_product, id_flashsale } = req.body

      const check_product = await productModel.findOne({
        include: {
          model: categoryModel,
          as: 'categorys',
          where: { status: true }
        },
        include: {
          model: flashsaleItemModel,
          as: 'flashsaleItems',
          where: {
            id_product: { [Op.ne]: id_product },
            id_flashsale: { [ Op.ne ]: id_flashsale }
          }
        },
        where: {  id: id_product ,  quantity: { [Op.gt]: 0 }  }
      })
      console.log('check_product', check_product)
    
      if (check_product) {
        return res.status(401).json({ msg: 'this product does not exist ' })
      }

      if (quantity > check_product.quantity) {
        return res
          .status(401)
          .json({
            msg: 'quantity of flashsale must be less than or equal to quantity of product'
          })
      }
    

      const flashsaleItem = await flashsaleItemModel.create({
        discount,
        quantity,
        id_product,
        id_flashsale
      })
      return res.status(200).json({ check_product })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: error })
    }
  }
}

module.exports = flashsaleItemsController
