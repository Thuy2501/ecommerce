const nodemailer = require('nodemailer')

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    })
    await transporter.sendMail({
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: subject,
      text: `<p>You requested for email verification, kindly use this <a href="${text}">link</a> to verify your email address</p>`
    })

    console.log('email sent sucessfully')
  } catch (error) {
    console.log('error sendEmail: ', error)
  } 
}

module.exports = sendEmail                                 