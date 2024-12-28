const { pool } = require("../config/database")


const findUser = async(email) =>{
    const query = 'SELECT * FROM users WHERE email=$1';
    const values = [email];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

const createUser = async(data) =>{
    const query = "INSERT INTO users(email, username, password, role, birth_date) VALUES($1, $2, $3, $4, $5) RETURNING *;";
    const values = [data.email, data.username, data.password, data.role, data.birth_date];
    const { rows } = await pool.query(query, values);
    return rows[0];

}

module.exports = {
    findUser,
    createUser,
}