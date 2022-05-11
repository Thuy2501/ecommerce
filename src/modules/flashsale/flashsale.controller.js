const { flashsaleModel, productModel, flashsaleItemModel } = require('../index')
const sequelize = require('sequelize')
const { Op } = require('sequelize')

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
      //     where: {
      //       quantity: {
      //         [Op.gt]: 0
      //       }
      //     },
      //     include: {
      //       model: productModel,
      //       as: productModel.tableName
      //     }
      //   },
      //   where: {
      //     start_time: {
      //       [Op.lt]: new Date()
      //     },
      //     end_time: {
      //       [Op.gt]: new Date()
      //     }
      //   }
      // })

              const flashsaleId = await flashsaleItemModel.findAll({
                include: {
                  model: flashsaleModel,
                  as: flashsaleModel.tableName,
                  // where: {
                  //   start_time: {
                  //     [Op.lt]: new Date()
                  //   },
                  //   end_time: {
                  //     [Op.gt]: new Date()
                  //   }
                  // }
                },
                where: { id_product: 2 }
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

      // const check_time_flashsale = await flashsaleModel.findOne({
      //   attributes: [
      //     [sequelize.fn('max', sequelize.col('end_time')), 'maxTime']
      //   ],
      //   raw: true
      // })

      // const start = new Date(start_time)
      // const end = new Date(check_time_flashsale.maxTime)

      // if (start < end) {
      //   return res.status(401).json({
      //     msg: 'start_time must be greater than the previous end_time'
      //   })
      // }

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
  }
}

module.exports = flashsaleController
