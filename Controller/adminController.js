const User = require('../Model/user')

const userData = async (req, res) => {
  try {
    res.status(200).json({
      user: req.user,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    if (!users) {
      return res.status(400).json({ error: 'hereglegchid baihgui baina' })
    }
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({
      error: err.message,
    })
  }
}
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params

    const deletedUser = await User.findByIdAndDelete(id)

    if (!deletedUser) {
      return res.status(404).json({ message: 'Хэрэглэгч олдсонгүй' })
    }

    res.status(200).json({ message: 'Хэрэглэгч амжилттай устгагдлаа' })
  } catch (error) {
    console.error('deleteUser error:', error)
    res.status(500).json({ message: 'Серверийн алдаа' })
  }
}
const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { tolbor } = req.body
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { tolbor },
    )
    if (!updatedUser) {
      return res.status(404).json({ message: 'Хэрэглэгч олдсонгүй' })
    }
    res.status(200).json(updatedUser)
  } catch (err) {
    console.error('updateUser error:', err)
    res.status(500).json({ message: 'Серверийн алдаа' })
  }
}
module.exports = {
  userData,
  getUsers,
  deleteUser,
  updateUser,
}
