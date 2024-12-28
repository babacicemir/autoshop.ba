const dotenv = require("dotenv")
dotenv.config()

const { createDatabaseConnection } = require("./config/database")

const express = require("express")
const app = express()
const bodyParser = require("body-parser")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))


app.use((err, req, res, next) => {
    res.status(500).send(err)
})

app.listen(process.env.PORT, () => {
    console.log("Server is running on port", process.env.PORT)
})

createDatabaseConnection().then(() => {
    console.log("Connected to database")
}).catch(console.error)

module.exports = { app }

