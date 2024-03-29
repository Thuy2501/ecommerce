const { flashsaleModel, productModel, flashsaleItemModel } = require('../index')
const { Op, Sequelize } = require('sequelize')

const flashsaleController = {
  getFlashsales: async (req, res) => {
    try {
      const flashsales = await flashsaleModel.findAll({
        include: {
          model: productModel,
          as: 'products'
        }
      })
      res.status(200).send(flashsales)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  },
  getFlashsaleByTime: async (req, res) => {
    try {
      // const flashsaleId = await flashsaleModel.findOne({
      //   include: {
      //     model: flashsaleItemModel,
      //     as: flashsaleItemModel.tableName,
      // where: {
      //   quantity: {
      //     [Op.gt]: 0
      //   }
      // },
      //   include: {
      //     model: productModel,
      //     as: productModel.tableName
      //   }
      // },
      // where: {
      //   start_time: {
      //     [Op.lt]: new Date()
      //   },
      //   end_time: {
      //     [Op.gt]: new Date()
      //   }
      // }
      // })
      const flashsaleId = await flashsaleModel.findAll({
        attributes: ['name', 'description', 'start_time', 'end_time'],

        include: [
          {
            model: flashsaleItemModel,
            as: flashsaleItemModel.tableName,
            attributes: [
              'discount',
              'quantity',
              [
                Sequelize.literal(
                  '"flashsaleItems->products"."price" - (("flashsaleItems->products"."price" * "flashsaleItems"."discount")/ 100) '
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
            }
          }
        ]
      })
      return res.status(200).json({
        flashsaleId
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error })
    }
  },
  getFlashsaleById: async (req, res) => {
    try {
      const flashsales = await flashsaleModel.findOne(
        {
          include: {
            model: productModel,
            as: 'products'
          }
        },
        { where: { id: req.params.id }, raw: true }
      )
      res.status(200).send(flashsales)
      return res.status(200).json({
        flashsaleId
      })
    } catch (error) {
      res.status(500).json({ error: 'error' })
    }
  },
  postFlashsale: async (req, res) => {
    try {
      let { name, description, start_time, end_time } = req.body

      // const check_time = new Date(new Date(start_time) + 30 * 60 * 60 * 1000)
      // const end_times = new Date(end_time)

      // if (end_times > check_time) {
      //   return res.status(401).json({
      //     msg: 'thời gian cần phải lớn hơn'
      //   })
      // }

      const check_time_flashsale = await flashsaleModel.findAll({
        where: {
          start_time: {
            [Op.or]: [
              {
                [Op.lt]: start_time,
                [Op.lt]: end_time
              },
              { [Op.between]: [start_time, end_time] }
            ]
          },
          end_time: {
            [Op.or]: [
              {
                [Op.gt]: start_time,
                [Op.gt]: end_time
              },
              { [Op.between]: [start_time, end_time] }
            ]
          }
        },
        raw: true
      })

      if (check_time_flashsale.length) {
        return res.status(401).json({
          msg: 'This time frame already exists flashsale'
        })
      }

      const flashsale = await flashsaleModel.create({
        name,
        description,
        start_time,
        end_time
      })

      return res.status(200).json({
        flashsale
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: error })
    }
  },

  updateflashsale: async (req, res) => {
    try {
      let { name, description, start_time, end_time } = req.body
      // const check_time_flashsale = await flashsaleModel.findAll({
      //   where: {
      //     start_time: {
      //       [Op.or]: [
      //         {
      //           [Op.lt]: start_time,
      //           [Op.lt]: end_time
      //         },
      //         { [Op.between]: [start_time, end_time] }
      //       ]
      //     },
      //     end_time: {
      //       [Op.or]: [
      //         {
      //           [Op.gt]: start_time,
      //           [Op.gt]: end_time
      //         },
      //         { [Op.between]: [start_time, end_time] }
      //       ]
      //     }
      //   },
      //   raw: true
      // })

      // if (check_time_flashsale.length) {
      //   return res.status(401).json({
      //     msg: 'This time frame already exists flashsale'
      //   })
      // }
      
      const flashsale = await flashsaleModel.update(req.body, {
        where: { id: req.params.id }
      })
      if (flashsale)
        return res.status(200).json({ msg: 'update a flashsale', flashsale: flashsale })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error })
    }
  }
}

module.exports = flashsaleController
