const jwt = require('jsonwebtoken')
const User = require('../Model/user')
exports.protect = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(404).json({
        error: 'authorization bihgui baina',
      })
    }
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res.status(400).json({
        error: 'token baihgui baina',
      })
    }

    const tokenObj = jwt.verify(token, process.env.JWT)

    req.user = await User.findById(tokenObj.id)

    req.userId = tokenObj.id
    req.userRole = tokenObj.role
    next()
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

exports.admin = role => {
  return (req, res, next) => {
    if (role !== req.userRole) {
      return res.json({
        error: 'Таны эрх хүрэхгүй байна',
      })
    }
    next()
  }
}
