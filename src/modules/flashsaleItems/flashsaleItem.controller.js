const { flashsaleItemModel, productModel } = require('../index')
const { Op } = require('sequelize')

const flashsaleItemsController = {
  postflashsaleItems: async (req, res) => {
    try {
      const { discount, quantity, id_product, id_flashsale } = req.body

      const check_product = await productModel.findOne({
        where: { [Op.and]: [{ id: id_product }, { quantity: { [Op.gt]: 0 } }] }
      })
    
      if (!check_product) {
        return res.status(401).json({ msg: 'this product does not exist ' })
      }

      const flashsaleItem = await flashsaleItemModel.create({
        discount,
        quantity,
        id_product,
        id_flashsale
      })
      return res.status(200).json({ flashsaleItem })
    } catch (error) {
      return res.status(500).json({ error: error })
    }
  }
}

module.exports = flashsaleItemsController
