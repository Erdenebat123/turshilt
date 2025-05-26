const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Хэрэглэгчийн нэрийг оруулна уу'],
  },
  phone: {
    type: Number,
    required: [true, 'dugaaraa oruulna uu'],
  },
  tolbor: {
    type: Number,
    default: 0,
  },

  orst: {
    type: Number,
    required: [true, 'orst bich'],
  },
  haalga: {
    type: Number,
    required: [true, 'haalga bich '],
  },
  password: {
    type: String,
    minlength: 6,
    required: [true, 'Нууц үгээ оруулна уу'],
    select: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})
UserSchema.methods.getJsonWebToken = function () {
  const token = jwt.sign({ id: this._id, role: this.role }, process.env.JWT, {
    expiresIn: process.env.JWT_HUG,
  })

  return token
}
UserSchema.methods.checkPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', UserSchema)
