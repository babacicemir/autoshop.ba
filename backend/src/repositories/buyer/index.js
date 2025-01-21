const { pool } = require("../../config/database")

const getAllAds = async() => {
    const query = 'SELECT * FROM ads'
    const result = await pool.query(query)
    return result.rows
}

module.exports = {
    getAllAds,
}