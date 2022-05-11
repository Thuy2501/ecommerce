const schedule = require('node-schedule')
var cron = require('node-cron')
const nodemailer = require('nodemailer')
const { Op } = require('sequelize')
const { userModel, flashsaleModel } = require('../modules')

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

  cron.schedule('* 15 * * * *', async (subject, text) => {
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
}

module.exports = schedulejob
