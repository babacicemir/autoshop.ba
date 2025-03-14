const dotenv = require('dotenv')
dotenv.config()

const { createDatabaseConnection } = require('./config/database')

const express = require('express')
const routes = require('./routes')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/', routes)

app.use((err, req, res, next) => {
  res.status(500).send(err)
})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../../frontend'))
app.engine('ejs', require('ejs').renderFile)


app.listen(process.env.PORT, () => {
  console.log('Server is running on port', process.env.PORT)
})

createDatabaseConnection().then(() => {
  console.log('Connected to database')
}).catch(console.error)

module.exports = { app }



