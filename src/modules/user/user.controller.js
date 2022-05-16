const { userModel, orderModel, orderDetailsModels } = require('../index')
const bcrypt = require('bcrypt')
const { Op } = require('sequelize')

const userController = {
  getUsers: async (req, res) => {
    try {
      const { limit, page, username } = req.query

      if (typeof username == 'undefined') {
        const user = await userModel.findAll({
          attributes: { exclude: ['password'] },
          limit: Number(limit),
          offset: Number(page - 1) * Number(limit),
          order: [['id', 'DESC']],
          raw: true
        })
        return res.status(200).send(user)
      }

      const user = await userModel.findAll({
        attributes: { exclude: ['password'] },
        where: {
          [Op.or]: [
            {
              username: {
                [Op.substring]: `${username}`
              }
            }
          ]
        },
        limit: Number(limit),
        offset: Number(page - 1) * Number(limit),
        order: [['id', 'DESC']],
        raw: true
      })
      return res.status(200).send(user)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: error })
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await userModel.findOne({
        attributes: { exclude: ['password'] }
      })
      return res.status(200).send(user)
    } catch (error) {
      res.status(500).json({ error: 'error' })
    }
  },

  postUser: async (req, res) => {
    try {
      const { email, password, username, role } = req.body

      const user_email = await userModel.findOne({ where: { email } })

      if (user_email)
        return res.status(400).json({ msg: 'Email already exists!' })

      const passwordHash = await bcrypt.hash(password, 12)
      const newUser = {
        username,
        email,
        password: passwordHash
      }

      const user = await userModel.create(newUser)
      return res.status(200).json({ message: 'postUser Success!', user })
    } catch (error) {
      res.status(500).json({ error: 'what error?' })
    }
  },

  updateAdmin: async (req, res) => {
    try {
      const { email, role, username, verify, status } = req.body

      const checkEmail = await userModel.findOne({
        where: { email: email, id: req.params.id },
        raw: true
      })
      
      if (!checkEmail)
        return res.status(400).json({ message: 'Email or id does not exist!' })

      const up_admin = await userModel.update(
        { role, username, verify, status },
        { where: { id: req.params.id } }
      )

      if (up_admin) return res.status(200).json({ message: 'success' })
    } catch (error) {
      return res.status(500).json({ error: error })
    }
  },

  deleteUser: async (req, res) => {
    try {
      const id_user = await userModel.findOne({ where: { id: req.params.id } })
      if (!id_user) return res.status(400).json({ msg: 'id không tồn tại' })

      const order = await orderModel.findAll({
        where: {
          id_user: req.params.id
        },
        raw: true
      })

      for (od of order) {
        await orderDetailsModels.destroy({
          where: { order_id: od.id },
          raw: true
        })
      }

      await orderModel.destroy({
        where: {
          id_user: req.params.id
        }
      })

      await userModel.destroy({
        where: {
          id: req.params.id
        }
      })

      res.json({ msg: 'Delete a user' })
    } catch (error) {
      res.status(500).json({ error: 'error' })
    }
  }
}

module.exports = userController
