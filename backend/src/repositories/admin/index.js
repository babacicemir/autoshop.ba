const { pool } = require('../../config/database')


const getUsers = async() => {
  const query = 'SELECT * FROM users'
  const result = await pool.query(query)
  return result.rows
}


const blockUser = async(id) => {
  const query = 'UPDATE users SET blocked=true WHERE ID=$1 RETURNING*;'
  const values = [id]
  const result =  await pool.query(query, values)
  return result.rows[0] 
}

const unblockUser = async(id) => {
  const query = 'UPDATE users SET blocked=false WHERE ID=$1 RETURNING*;'
  const values = [id]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const deleteUser = async(id) => {
  const query = 'DELETE FROM users WHERE id=$1 RETURNING*;'
  const values = [id]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const getReports = async() => {
  const query = 'SELECT u.email AS "reporter_email", reported.email AS "reported_user_email", r.reason AS "reason", r.details AS "details", r.created_at AS "created_at", r.status AS "status_report" FROM reports r JOIN users u ON u.ID = r.userID JOIN users reported ON reported.ID = r.reported_user_id;'
  const result = await pool.query(query)
  return result.rows
}

const deleteAd = async(id) => {
  const query = 'DELETE FROM ads WHERE id=$1 RETURNING*;'
  const values = [id]
  const result = await pool.query(query,values)
  return result.rows[0]
}

const getAds = async() => {
  const query = 'select a.id as "add_id", u.email , u.username, a.title, a.description, a.price, a.year, a.image_url, a.location, a.status, a.created_at from ads a join users u on u.ID = a.user_id ;'
  const result = await pool.query(query)
  return result.rows
}

module.exports = {
  blockUser,
  unblockUser,
  deleteUser,
  getReports,
  deleteAd,
  getAds,
  getUsers,
}
