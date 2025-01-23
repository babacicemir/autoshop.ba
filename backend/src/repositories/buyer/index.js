const { pool } = require("../../config/database")

const getAllAds = async() => {
    const query = 'SELECT * FROM ads'
    const result = await pool.query(query)
    return result.rows
}

const reportedUser = async(reportInformations) => {
    const query = 'INSERT INTO reports(userid, reported_user_id, reason, details) VALUES($1, $2, $3, $4) RETURNING*'
    const values = [reportInformations.userId, reportInformations.reportedUserId, reportInformations.reason, reportInformations.details]
    const result = await pool.query(query, values)
    return result.rows[0]
  }

module.exports = {
    getAllAds,
    reportedUser,
}