const express = require ('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')

require('dotenv').config({ path: process.cwd() + '/.env' });

const sauceRoutes = require('./routes/sauce')
const userRoutes = require('./routes/user')

const app = express()
app.use(helmet())

let connection = 'mongodb+srv://nginisty:123@cluster0.insup.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(connection,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connection to MongoDB is successful !'))
  .catch(() => console.log('Connection to MongoDB failed !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:4200')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

app.use(bodyParser.json())
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/sauces', sauceRoutes)
app.use('/api/auth', userRoutes)

module.exports = app