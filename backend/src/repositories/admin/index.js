const { pool } = require('../../config/database')

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
  return result.rows[0]
}

module.exports = {
  blockUser,
  unblockUser,
  deleteUser,
  getReports
}
