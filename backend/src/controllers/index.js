const userRepository = require('../repositories/index')
const { hashedPassword } = require('../utils/index')
const bcrypt  = require('bcrypt')
const jwt = require('jsonwebtoken')
 
const signup = async (req, res)  =>{
  console.log("evo me")
  const { email, username, password, role, birth_date } = req.body
  try{
    const userExists = await userRepository.findUser(email)
    if(userExists){
      return res.status(401).render('signup', { error: 'User already exists!' });
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
      res.redirect('/users/login')
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}

const login = async(req, res) => {
  const { email, password } = req.body
  try{
    console.log(email, password)
    const user = await userRepository.findUser(email)
    if(!user){
      return res.status(401).json({ error: 'User does not exist!' })
    }
        
    const isPasswordMatching = bcrypt.compareSync(password, user.password)
    if(!isPasswordMatching){
      return res.status(401).json({ error: 'Invalid password!' })
    }

    const payload = {
      id: user.id,
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

const login_fe = (req, res) => {
  res.render('login')
}
const signup_fe = (req, res) => {
  res.render('signup')
}

const homepage_fe = (req, res) => {
  res.render('homepage')
}

module.exports = {
  signup,
  login,
  login_fe,
  signup_fe,
  homepage_fe
}