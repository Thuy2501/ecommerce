const { productModel, orderDetailsModels, categoryModel } = require('../index')
const { Op, Sequelize } = require('sequelize')
const { saveImage } = require('../../helpers/saveImage')
const { flashsaleItemModel } = require('../flashsaleItems/flashsaleItem.model')
const { flashsaleModel } = require('../flashsale/flashsale.model')

const productController = {
  getProduct: async (req, res) => {
    try {
      const {
        limit,
        page
      } = req.query

      const product = await productModel.findAndCountAll({
        include: {
          attributes: ['id'],
          model: categoryModel,
          as: 'categorys',
          where: { status: true }
        },
        where: {
          quantity: {
            [Op.gt]: 0
          }
        },
        limit: Number(limit),
        offset: Number(page - 1) * Number(limit),
        order: [['created_at', 'DESC']],
        raw: true
      })

      if (product.rows) {
        for (const item of product.rows) {
          const flashSaleItem = await flashsaleItemModel.findOne({
            attributes: ['discount', 'quantity'],
            where: { id_product: item.id, status: 'pending' }
          })

          if (flashSaleItem) {
            item.sell_price =
              item.price - (flashSaleItem.discount * item.price) / 100
          }
        }
      }

      return res.send(product.rows)
    } catch (error) {
      console.log('error', error)
      return res.status(500).json({ error: error })
    }
  },

  getProductById: async (req, res) => {
    try {
      const { limit, page } = req.query

      const check_flashsale = await flashsaleItemModel.findOne({
        include: {
          model: flashsaleModel,
          as: 'flashsales',
          where: {
            start_time: {
              [Op.lt]: new Date()
            },
            end_time: {
              [Op.gt]: new Date()
            }
          }
        },
        where: { id_product: req.params.id }
      })

      if (check_flashsale !== null) {
        const check_flashsale = await flashsaleItemModel.findOne({
          attributes: [
            'discount',
            'quantity',
            [
              Sequelize.literal(
                '"products"."price" - (("products"."price" * "flashsaleItems"."discount")/ 100) '
              ),
              'sell_price'
            ]
          ],
          where: {
            quantity: {
              [Op.gt]: 0
            }
          },
          include: {
            model: productModel,
            as: 'products',
            attributes: [
              'name',
              'price',
              'description',
              'barcode',
              'image',
              'image_detail'
            ]
          },
          where: { id_product: req.params.id }
        })
        return res.send(check_flashsale)
      }

      const product = await productModel.findOne({
        include: {
          model: categoryModel,
          as: 'categorys',
          where: { status: true }
        },
        where: { id: req.params.id },
        limit: Number(limit),
        offset: Number(page - 1) * Number(limit),
        order: [['created_at', 'DESC']]
        // raw: true
      })

      if (!product) {
        return res.status(500).json({ msg: 'product does not exist' })
      }

      return res.send(product)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'error' })
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
        where: { id: id_category, status: true }
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
