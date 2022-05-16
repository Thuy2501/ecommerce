const { userModel } = require('../index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { uid } = require('uid')
const { randPass } = require('../../validation/randPass')
const sendEmail = require('../../utils/mailer')

const accountController = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body

      const user_email = await userModel.findOne({ where: { email } })

      if (user_email)
        return res.status(400).json({ message: 'Email already exists' })

      const passwordHash = await bcrypt.hash(password, 12)

      const newUser = {
        email,
        password: passwordHash,
        uid: uid(25)
      }

      await userModel.create(newUser)
      // const user = await userModel.findOne({ where: { email } })

      // const activation_token = createActivationToken({ id: user.id })

      const messageEmail = `${process.env.APP_URL}/account/verify/${newUser.uid}`

      await sendEmail(newUser.email, 'Verify Email', messageEmail)

      res.status(200).json({
        message: 'Vui lòng check email!'
      })
    } catch (error) {
      console.log('errr', error)
      return res.status(500).json({ error: error })
    }
  },

  verify: async (req, res) => {
    try {
      const token = req.params.token

      // jwt.verify(
      //   token,
      //   process.env.ACTIVATION_TOKEN_SECRET,
      //   async (err, user) => {
      //     if (err) {
      //       return res.status(401).json({ message: 'Xác thực không hợp lệ.' })
      //     }

      //     await userModel.update(
      //       { verify: true },
      //       {
      //         where: { id: user.id, uid: token }
      //       }
      //     )
      //   }
      // )

      await userModel.update(
        { verify: true },
        {
          where: { id: user.id, uid: token }
        }
      )

      return res.status(200).json({
        message: 'verify Success!'
      })
    } catch (error) {
      return res.status(500).json({ error: error })
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body

      const user = await userModel.findOne({ where: { email }, raw: true })

      if (!user)
        return res.status(400).json({ message: 'Email does not exist!' })

      if (!user.verify) {
        return res.status(400).json({ message: 'unverified email!' })
      }

      if (user.status == false) {
        return res.status(400).json({ message: 'Account has been disabled' })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return res.status(400).json({ message: 'Sai mật khẩu!' })

      const access_token = createAccessToken({ id: user.id })

      const refresh_token = createRefreshToken({ id: user.id })

      return res.status(200).json({
        message: 'Login Success!',
        access_token,
        refresh_token
      })
    } catch (err) {
      return res.status(500).json({ error: error })
    }
  },

  changePassword: async (req, res) => {
    try {
      let { old_password, new_password } = req.body

      const isMatch = await bcrypt.compare(old_password, req.user.password)

      if (!isMatch) return res.status(400).json({ message: 'Sai mật khẩu!' })

      const passwordHash = await bcrypt.hash(new_password, 12)

      await userModel.update(
        { password: passwordHash },
        {
          where: { id: req.user.id }
        }
      )

      return res.status(200).json({ message: 'success' })
    } catch (error) {
      return res.status(500).json({ error: error })
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { email } = req.body

      const isMail = await userModel.findOne({ where: { email }, raw: true })
      if (!isMail)
        return res.status(400).json({ message: 'Email does not exist!' })

      const re_password = randPass(5, 3)
      const passwordHash = await bcrypt.hash(re_password, 12)

      await userModel.update(
        { password: passwordHash },
        { where: { email }, raw: true }
      )

      return res.status(200).json({
        message: 'reset password success',
        re_password
      })
    } catch (error) {
      return res.status(500).json({ error: error })
    }
  },

  updateAccount: async (req, res) => {
    try {
      const { username } = req.body

      const user = await userModel.update(
        { username },
        {
          where: { id: req.user.id }
        }
      )

      if (user)
        return res
          .status(200)
          .json({ msg: 'update account success', up_user: user })
    } catch (error) {
      return res.status(500).json({ error: error })
    }
  },

  getAccount: async (req, res) => {
    try {
      const user = await userModel.findOne({
        attributes: ['username', 'email'],
        where: { id: req.user.id }
      })
      return res.status(200).send(user)
    } catch (error) {
      return res.status(500).json({ error: error })
    }
  },

  generateAccessToken: async (req, res) => {
    try {
      const { rf_token } = req.body
      jwt.verify(
        rf_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          if (err) return res.status(400).json({ message: 'Please login now.' })

          const user = await userModel.findOne({ where: { id: result.id } })
          if (!user)
            return res.status(400).json({ message: 'This does not exist.' })

          const access_token = createAccessToken({ id: result.id })

          return res.status(200).json({
            access_token
          })
        }
      )
    } catch (err) {
      return res.status(500).json({ error: error })
    }
  }
}

// const createActivationToken = (payload) => {
//   return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET)
// }

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '30d'
  })
}

module.exports = accountController
