const mongoose = require('mongoose')
const colors = require('colors')
const Connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('database amjilttai holbogdloo'.green.bold)
  } catch (err) {
    console.log('database holbogdsongui'.red.bold, err)
  }
}

module.exports = Connectdb
