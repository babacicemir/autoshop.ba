const bcrypt = require('bcrypt')
const { getUserId } = require("../repositories")
const jwt = require("jsonwebtoken")

const hashedPassword = (password) =>{
  const encryptedPassword = bcrypt.hashSync(password, 10)
  return encryptedPassword
}

const getUserInformationsByToken = async(req) => {
  let token = req.header('Authorization')
  token = token.split(' ')[1]
  const decoded = jwt.verify(token, process.env.TOKEN_CODE)
  const user = await getUserId(decoded.id)
  return user
}

module.exports={
  hashedPassword,
  getUserInformationsByToken
}