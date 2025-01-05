const dotenv = require('dotenv')
dotenv.config({ path: '../.env' })

const { Pool } = require('pg')

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
})


const createDatabaseConnection = async () =>{
  try{
    const client = await pool.connect()
    client.release()
  }catch(err){
    console.log('Error connecting to the database', err.stack)
  }
}

module.exports = {
  pool,
  createDatabaseConnection,
}