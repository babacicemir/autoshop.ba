const userRepository = require('../repositories/index')
const { hashedPassword } = require('../utils/index')
const bcrypt  = require('bcrypt')
const jwt = require('jsonwebtoken')
 
const signup = async (req, res)  =>{
  const { email, username, password, role, birth_date } = req.body
  try{
    const userExists = await userRepository.findUser(email)
    if(userExists){
      return res.status(401).json({ error: 'User already exists!' })
    }

    const encryptedPassword = hashedPassword(password)

    const data = {
      email,
      username,
      password : encryptedPassword,
      role,
      birth_date
    }

    const user = await userRepository.createUser(data)
    
    if (user) {
      return res.status(200).json({ message: 'Successfully created user' })
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}

const login = async(req, res) => {
  const { email, password } = req.body
  try{
    const user = await userRepository.findUser(email)
    if(!user){
      return res.status(401).json({ error: 'User doesn\'t exist!' })
    }
        
    const isPasswordMatching = bcrypt.compareSync(password, user.password)
    if(!isPasswordMatching){
      return res.status(401).json({ error: 'Invalid password!' })
    }

    const payload = {
      email: user.email,
      name: user.username,
      password: user.password,
      role: user.role,
    }

    const token = jwt.sign(payload, process.env.TOKEN_CODE)
    return res.status(200).json({ message: 'Login successful', data: token })

  }catch(error){
    return res.status(401).json({ error: 'Login unsuccessful' })
  }
}

module.exports = {
  signup,
  login
}