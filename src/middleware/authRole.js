function authRole(role) {
  return (req, res, next) => {
    if (role.find((role) => role === req.user.role)) {
      next()
    } else {
      res
        .status(403)
        .json({ message: 'User is not authorized to perform this URL' })
    }
  }
}
module.exports = { authRole }