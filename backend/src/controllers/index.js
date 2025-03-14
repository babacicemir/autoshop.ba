const userRepository = require('../repositories/index')
const { hashedPassword } = require('../utils/index')
const bcrypt  = require('bcrypt')
const jwt = require('jsonwebtoken')
 
const signup = async (req, res)  =>{
  const { email, username, password, role, birth_date } = req.body
  console.log(email, username, password, role, birth_date)
  try{
    const userExists = await userRepository.findUser(email)
    if(userExists){
      return res.status(401).render('signup', { error: 'User already exists!' })
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

    console.log(data)
    
    if (user) {
      res.redirect('/autoshop.ba/login')
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
      return res.status(401).json({ error: 'User does not exist!' })
    }

    if(user.blocked===true){
      return res.status(403).json({ error: 'Access denied' })
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
    
    res.cookie('token', token, {
      httpOnly: true,  
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict', 
      maxAge: 7200000, 
    })


    if (user.role === 'admin') {
      return res.status(200).redirect('/admin/homepage')
    }

    if (user.role === 'seller') {
      return res.status(200).redirect('/seller/homepage')
    }

    if (user.role === 'buyer') {
      return res.status(200).redirect('/buyer/welcome')
    }

  }catch(error){
    return res.status(401).json({ error: 'Login unsuccessful' })
  }
}

const logoutUser = (req, res) => {
  res.clearCookie('token') 
  res.redirect('/autoshop.ba') 
}

const login_fe = (req, res) => {
  res.render('login')
}
const signup_fe = (req, res) => {
  res.render('signup', { error: null })
}

const homepage_fe = (req, res) => {
  res.render('homepage')
}

module.exports = {
  signup,
  login,
  login_fe,
  signup_fe,
  homepage_fe, 
  logoutUser
}