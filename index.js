const express = require('express')
const dotenv = require('dotenv').config({ path: './config/config.env' })
const colors = require('colors')
const cors = require('cors')
const Connectdb = require('./config/DB')
const app = express()
Connectdb()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', require('./Routes/authRoutes'))

app.listen(
  process.env.PORT,
  console.log(`Server  ${process.env.PORT} deer aslaa`.rainbow.bold)
)
