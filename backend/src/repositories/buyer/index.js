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
  const query = 'DELETE from saved_ads WHERE user_id=$1 AND ad_id=$2 RETURNING*'
  const values = [adInformations.userId, adInformations.adId]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const getAllSavedAdsByUserId = async(userId) => {
  const query = 'select  sa.id as "ad_id", sa.created_at as "ad_saved_date", title, description, price, image_url, location, status,  year, a.created_at as "ad_date"  from saved_ads sa join ads a on a.id = sa.ad_id  where sa.user_id=$1'
  const values = [userId]
  const result = await pool.query(query,values)
  return result.rows
}

const sendBid = async(bidInformations) => {
  const query = 'INSERT INTO bids(bid_price, message, user_id, ad_id) VALUES ($1, $2, $3, $4) RETURNING*'
  const values = [bidInformations.bidPrice, bidInformations.message, bidInformations.userId, bidInformations.adId]
  const result = await pool.query(query,values)
  return result.rows
}

module.exports = {
  getAllAds,
  reportedUser,
  saveAd,
  deleteSavedAdByIds,
  getAllSavedAdsByUserId,
  sendBid
}