const jwt = require('jsonwebtoken')
const {userModel} = require('../modules/index')

const auth = (req, res, next) => {

  try {
    const token = req.headers[ 'authorization' ].split(' ')[ 1 ]

    // const token = req.header('Authorization')

    // const token = authHeader && authHeader.split(' ')[ 1 ]

    if (!token) {
      return res.status(400).json({ msg: 'Xác thực không hợp lệ.' })
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
      if (err) {
        return res.status(401).json({ msg: 'Xác thực không hợp lệ.' })
      }

      req.user = await userModel.findOne({ where: { id: user.id } })
      
      next() 
    })
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}

module.exports = auth
