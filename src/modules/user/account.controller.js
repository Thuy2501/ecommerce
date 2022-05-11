const { userModel } = require('../index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { randPass } = require('../../validation/randPass')
const sendEmail = require('../../utils/mailer')

const accountController = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body

      const user_email = await userModel.findOne({ where: { email } })

      if (user_email)
        return res.status(400).json({ msg: 'email already exists' })

      const passwordHash = await bcrypt.hash(password, 12)

      const newUser = {
        email,
        password: passwordHash
      }

      await userModel.create(newUser)
      const user = await userModel.findOne({ where: { email } })

      const activation_token = createActivationToken({ id: user.id })

      const message = `${process.env.APP_URL}/account/verify/${activation_token}`
     
      await sendEmail(newUser.email, 'Verify Email', message)

      res.status(200).json({
        msg: 'Vui lòng check email!'
      })
    } catch (err) {
      return res.status(500).json({ err: err.message })
    }
  },

  verify: async (req, res) => {
    try {
      const token = req.params.token

      jwt.verify(
        token,
        process.env.ACTIVATION_TOKEN_SECRET,
        async (err, user) => {
          if (err) {
            return res.status(401).json({ msg: 'Xác thực không hợp lệ.' })
          }

          await userModel.update(
            { verify: true },
            {
              where: { id: user.id }
            }
          )
        }
      )

      res.status(200).json({
        msg: 'verify Success!'
      })
    } catch (err) {
      return res.status(500).json({ err: err })
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body

      const user = await userModel.findOne({ where: { email }, raw: true })

      if (!user) return res.status(400).json({ msg: 'Email does not exist!' })

      if (!user.verify) {
        return res.status(400).json({ msg: 'unverified email!' })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return res.status(400).json({ msg: 'Sai mật khẩu!' })

      const access_token = createAccessToken({ id: user.id })

      const refresh_token = createRefreshToken({ id: user.id })

      // res.cookie('refreshtoken', refresh_token, {
      //   httpOnly: true,
      //   path: '/account/refresh_token',
      //   maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
      // })
      // delete user['password']
      res.status(200).json({
        msg: 'Login Success!',
        access_token,
        refresh_token
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },

  changePassword: async (req, res) => {
    try {
      let { old_password, change_password } = req.body

      const isMatch = await bcrypt.compare(old_password, req.user.password)

      if (!isMatch) return res.status(400).json({ msg: 'Sai mật khẩu!' })

      const passwordHash = await bcrypt.hash(change_password, 12)

      await userModel.update(
        { password: passwordHash },
        {
          where: { id: req.user.id }
        }
      )

      res.status(200).json({ message: 'success' })
    } catch (error) {
      return res.status(500).json({ msg: err.message })
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { email } = req.body

      const isMail = await userModel.findOne({ where: { email }, raw: true })
      if (!isMail)
        return res.status(400).json({ msg: 'Email này không tồn tại' })

      const re_password = randPass(5, 3)
      const passwordHash = await bcrypt.hash(re_password, 12)

      await userModel.update(
        { password: passwordHash },
        { where: { email }, raw: true }
      )

      res.status(200).json({
        msg: 'reset password success',
        re_password
      })
    } catch (error) {
      return res.status(500).json({ msg: err.message })
    }
  },

  updateAdmin: async (req, res) => {
    try {
      const { email, role } = req.body

      const checkEmail = await userModel.findOne({
        where: { email: email },
        raw: true
      })

      if (!checkEmail)
        return res.status(400).json({ msg: 'email không tồn tại' })

      const up_admin = await userModel.update(
        { role },
        { where: { email: email } }
      )

      if (up_admin) res.status(200).json({ msg: 'success' })
    } catch (error) {
      res.status(500).json({ msg: 'error update_admin' })
    }
  },

  generateAccessToken: async (req, res) => {
    try {
      // const rf_token = req.cookies.refreshtoken
      // if (!rf_token) return res.status(400).json({ msg: 'Please login now.' })
      const { rf_token } = req.body
      jwt.verify(
        rf_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          if (err) return res.status(400).json({ msg: 'Please login now.' })

          const user = await userModel.findOne({ where: { id: result.id } })
          if (!user)
            return res.status(400).json({ msg: 'This does not exist.' })

          const access_token = createAccessToken({ id: result.id })

          res.status(200).json({
            access_token
          })
        }
      )
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET)
}

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '30d'
  })
}

module.exports = accountController
