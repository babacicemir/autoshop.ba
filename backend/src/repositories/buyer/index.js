const { pool } = require('../../config/database')

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

const saveAd = async(informations) => {
  const query = 'INSERT INTO saved_ads(user_id, ad_id) VALUES($1, $2) RETURNING*'
  const values = [informations.userId, informations.adId]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const deleteSavedAdByIds = async(adInformations) => {
    console.log(adInformations)
    const query = 'DELETE from saved_ads WHERE user_id=$1 AND ad_id=$2 RETURNING*'
    const values = [adInformations.userId, adInformations.adId]
    const result = await pool.query(query, values)
    return result.rows[0]
}

module.exports = {
  getAllAds,
  reportedUser,
  saveAd,
  deleteSavedAdByIds,
}