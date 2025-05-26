const User = require('../Model/user')


//register
const registerUser = async (req, res) => {
  try {
    const { name, phone, password, orst, haalga } = req.body
    if (
      !name ||
      !phone ||
      !password ||
      password.length < 6 ||
      !orst ||
      !haalga
    ) {
      return res.json({
        error: 'талбараа гүйцэд бөглөнүү',
      })
    }

    const exits = await User.findOne({ phone })
    if (exits) {
      return res.json({
        error: 'dugaar burguulsen baina',
      })
    }

    const user = await User.create({
      name,
      phone,
      password,
      orst,
      haalga,
    })

    return res.status(200).json({
      success: true,
      token: user.getJsonWebToken(),
      user: user,
    })
  } catch (err) {
    console.log(err)
  }
}
//login
const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body
    if (!phone || !password) {
      return res.json({
        error: 'talbaraa boglunoo',
      })
    }
    const user = await User.findOne({ phone }).select('+password')
    if (!user) {
      return res.json({
        error: 'hereglegch burtguuleegui baina',
      })
    }
    const match = await user.checkPassword(password)
    if (!match) {
      return res.json({
        error: 'password bolon dugaara zuv oruulna uu',
      })
    }
    res.status(200).json({
      success: true,
      token: user.getJsonWebToken(),
      user: user,
    })
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  registerUser,
  loginUser,
}
