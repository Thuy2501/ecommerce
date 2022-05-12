const { orderDetailsModels, productModel, categoryModel } = require('../index')
const { Op } = require('sequelize')
const { saveImage } = require('../../helpers/saveImage')

const categoryController = {
  getCategorys: async (req, res) => {
    try {
      const { limit, page, name } = req.query

      if (!name) {
        const category = await categoryModel.findAndCountAll({
          limit: Number(limit),
          offset: Number(page - 1) * Number(limit),
          order: [['index', 'DESC']],
          raw: true
        })
        return res.send(category)
      }
      const category = await categoryModel.findAndCountAll({
        where: {
          name: {
            [Op.substring]: `${name}`
          }
        },
        limit: Number(limit),
        offset: Number(page - 1) * Number(limit),
        order: [['created_at', 'DESC']],
        raw: true
      })
      res.send(category)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  },

  getProductOfCategoryById: async (req, res) => {
    try {
      const category = await categoryModel.findOne({
        include: {
          model: productModel,
          as: 'products'
        },
        where: { id: req.params.id }
      })
      return res.send(category)
    } catch (error) {
      return res.status(500).json({ error: 'error' })
    }
  },

  postCategory: async (req, res) => {
    try {
      const { name, status, index } = req.body

      const check_name = await categoryModel.findOne({ where: { name } })

      if (check_name)
        return res.status(400).json({ msg: 'Category name already exists' })

      const image = await saveImage(req)
      const category = await categoryModel.create({
        name,
        status,
        index,
        banner: image.banner
      })

      res.status(200).json({ msg: 'post a category', category: category })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error })
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { name, status, index } = req.body
      const image = await saveImage(req)
      const category = await categoryModel.update(
        { name, status, index, banner: image.banner },
        {
          where: { id: req.params.id }
        }
      )
      if (category)
        res.status(200).json({ msg: 'update a category', category: category })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'error' })
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const order_id = await orderDetailsModels.findAll(
        {
          where: { category_id: req.params.id }
        },
        { row: true }
      )

      if (!order_id.length) {
        res.status(400).json({
          msg: 'The category already exists in the order table'
        })
      }

      await categoryModel.destroy({
        where: { id: req.params.id }
      })
      res.status(200).json({ mes: 'delete success' })
    } catch (error) {
      res.status(500).json({ error: 'error' })
    }
  }
}

module.exports = categoryController
