const { userModel, orderModel, orderDetailsModels } = require('../index')
const bcrypt = require('bcrypt')

const userController = {
  getUser: async (req, res) => {
    try {
      const user = await userModel.findAll({ raw: true })
      res.send(user)
    } catch (error) {
      res.status(500).json({ error: 'error' })
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await userModel.findOne({ where: { id: req.params.id } })
      res.send(user)
    } catch (error) {
      res.status(500).json({ error: 'error' })
    }
  },

  postUser: async (req, res) => {
    try {
      const { email, password, username, role } = req.body

      const user_email = await userModel.findOne({ where: { email } })

      if (user_email)
        return res.status(400).json({ msg: 'Email này đã tồn tại' })

      const passwordHash = await bcrypt.hash(password, 12)
      const newUser = {
        username,
        email,
        password: passwordHash
      }

      await userModel.create(newUser)

      res.json({ msg: 'success' })
    } catch (error) {
      res.status(500).json({ error: 'what error?' })
    }
  },

  updateUser: async (req, res) => {
    try {
      const id_user = await userModel.findOne({ where: { id: req.params.id } })
      if (!id_user) return res.status(400).json({ msg: 'id không tồn tại' })

      const { username } = req.body

      const user = await userModel.update(
        { username },
        {
          where: { id: req.params.id }
        }
      )

      if (user) res.status(200).json({ msg: 'success', user_up: user })
    } catch (error) {
      res.status(500).json({ error: 'error' })
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
