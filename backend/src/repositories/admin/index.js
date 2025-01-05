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

module.exports = {
  blockUser,
  unblockUser,
  deleteUser
}
