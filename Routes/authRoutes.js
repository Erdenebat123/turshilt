const express = require('express')
const router = express.Router()
const cors = require('cors')
const {
  registerUser,
  loginUser,
} = require('../Controller/authController')
const { protect, admin } = require('../middleware/protect.js')
const {
  userData,
  getUsers,
  deleteUser,
  updateUser,
} = require('../Controller/adminController.js')

router.use(
  cors({

    origin: 'http://localhost:5173',
  })
)

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/userData', protect, userData)
router.get('/getusers', protect, admin('admin'), getUsers)
router.delete('/deleteuser/:id', protect, admin('admin'), deleteUser)
router.put('/updateuser/:id', protect, admin('admin'), updateUser)
module.exports = router
