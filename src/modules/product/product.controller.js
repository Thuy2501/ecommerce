const { productModel, orderDetailsModels, categoryModel } = require('../index')
const { Op } = require('sequelize')
const { saveImage } = require('../../helpers/saveImage')

const productController = {
  getProduct: async (req, res) => {
    try {
      const {
        limit,
        page,
        name,
        description,
        priceMin,
        priceMax,
        imPriceMin,
        imPriceMax,
        barcode
      } = req.query

      if (
        typeof name == 'undefined' &&
        typeof description == 'undefined' &&
        typeof priceMin == 'undefined' &&
        typeof priceMax == 'undefined' &&
        typeof imPriceMin == 'undefined' &&
        typeof imPriceMax == 'undefined' &&
        typeof barcode == 'undefined'
      ) {
        const products = await productModel.findAndCountAll({
          limit: Number(limit),
          offset: Number(page - 1) * Number(limit),
          order: [['created_at', 'DESC']],
          raw: true
        })
        return res.send(products)
      }

      const products = await productModel.findAndCountAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.substring]: `${name}`
              }
            },
            {
              description: {
                [Op.substring]: `${description}`
              }
            },
            {
              price: {
                [Op.between]: [priceMin, priceMax]
              }
            },
            {
              import_price: {
                [Op.between]: [imPriceMin, imPriceMax]
              }
            },
            {
              barcode: {
                [Op.substring]: `${barcode}`
              }
            }
          ]
        },
        limit: Number(limit),
        offset: Number(page - 1) * Number(limit),
        order: [['created_at', 'DESC']],
        raw: true
      })
      res.send(products)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  },

  getProductById: async (req, res) => {
    try {
      const product = await productModel.findOne({
        where: { id: req.params.id }
      })
      res.send(product)
    } catch (error) {
      res.status(500).json({ error: 'error' })
    }
  },

  postProduct: async (req, res) => {
    try {
      const {
        name,
        price,
        import_price,
        description,
        barcode,
        quantity,
        id_category
      } = req.body
      //check id of category
      const check_idCategory = await categoryModel.findOne({
        where: { id: id_category }
      })

      if (!check_idCategory) {
        return res.status(401).json({ msg: 'This categody does not exist' })
      }
      //save img
      const image = await saveImage(req)

      const arrar_image_detail = image.image_detail.toString()

      //create product
      const product = await productModel.create({
        name,
        price,
        import_price,
        description,
        barcode,
        quantity,
        id_category,
        image: image.image,
        image_detail: arrar_image_detail
      })

      return res.status(200).json({ msg: 'post a product', product: product })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'error' })
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { name, price, import_price, description, barcode, quantity } =
        req.body

      const image = await saveImage(req)

      const arrar_image_detail = image.image_detail.toString()
      const product = await productModel.update(
        {
          name,
          price,
          import_price,
          description,
          barcode,
          quantity,
          image: image.image,
          image_detail: arrar_image_detail
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
