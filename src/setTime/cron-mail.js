const schedule = require('node-schedule')
var cron = require('node-cron')
const nodemailer = require('nodemailer')
const { Op } = require('sequelize')
const {
  userModel,
  flashsaleModel,
  flashsaleItemModel,
  productModel
} = require('../modules')

const schedulejob = () => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD
    }
  })

  //gửi mail trước skhi flashsale bắt đầu 15p
  cron.schedule('* 15 * * * 2', async (subject, text) => {
    try {
      const flashsale_user = await userModel.findAll({
        attributes: ['email'],
        raw: true
      })

      const flashsale = await flashsaleModel.findOne({
        where: {
          start_time: {
            [Op.gte]: new Date(new Date() - 15 * 60 * 1000),
            [Op.lte]: new Date()
          }
        }
      })

      if (flashsale) {
        for (const iterator of flashsale_user) {
          await transporter.sendMail({
            from: process.env.MAIL_USERNAME,
            to: iterator.email,
            subject: subject,
            text: `<p>You requested for email verification, kindly use this <a href="${text}">link</a> to verify your email address</p>`
          })
          console.log('email sent sucessfully')
        }
      }
    } catch (error) {
      console.log('error sendEmail: ', error)
    }
  })

  //update status flashsaleItem
  cron.schedule('* * * * * *', async () => {
    try {
      const flashsaleItem = await flashsaleItemModel.findAll({
        attributes: ['id', 'id_product', 'status'],
        include: {
          model: flashsaleModel,
          as: flashsaleModel.tableName,
          attributes: ['id'],
          where: {
            start_time: {
              [Op.lt]: new Date()
            },
            end_time: {
              [Op.gt]: new Date()
            }
          }
        },
        raw: true
      })

      for (const iterator of flashsaleItem) {
        const update_status_flashsaleItem = await flashsaleItemModel.update(
          {
            status: 'pending'
          },
          { where: { id: iterator.id, status: false } }
        )
      }
    } catch (error) {
      console.log('error update status product: ', error)
    }
  })

  // update status & quantity product
  cron.schedule('* * * * * *', async () => {
    try {
      const flashsale = await flashsaleItemModel.findAll({
        attributes: ['id', 'id_product', 'quantity', 'status'],
        include: {
          model: flashsaleModel,
          as: flashsaleModel.tableName,
          attributes: ['id'],
          where: {
            end_time: {
              [Op.lt]: new Date()
            }
          }
        },
        raw: true
      })

      for (const iterator of flashsale) {
        const quantity_product = await productModel.findOne({
          attributes: ['quantity'],
          where: { id: iterator.id_product },
          raw: true
        })

        if (iterator.status == 'pending') {
          const update_quantity_product = await productModel.update(
            {
              quantity: iterator.quantity + quantity_product.quantity
            },
            { where: { id: iterator.id_product } }
          )
          const update_status_flashsale = await flashsaleItemModel.update(
            {
              status: 'true'
            },
            { where: { id: iterator.id, status: 'pending' } }
          )
        }
      }
    } catch (error) {
      console.log('error update status and quantity product: ', error)
    }
  })
}

module.exports = schedulejob
