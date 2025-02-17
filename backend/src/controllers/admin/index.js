const adminRepository = require('../../repositories/admin')
const userRepository = require('../../repositories/index')
const { hashedPassword } = require('../../utils')

const users = async (req, res) => {
  try {
    const users = await adminRepository.getUsers()
    if (!users) {
      return res.status(404).render('admin_users', { error: 'No users found' })
    }
    res.status(200).render('admin_users', { users: users }) 
  } catch (error) {
    return res.status(500).render('admin_users', { error: error.message }); 
  }
};


const createUser = async(req, res) => {
  const { email, username, password, role, birth_date } = req.body
  try{

    const userExists = await userRepository.findUser(email)
    if(userExists){
      return res.status(401).render('/admin/users', { error: 'User already exists!' });
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
      res.redirect('/admin/users')
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}


const blockUser = async(req, res) => {
  const { id } = req.params
  const new_id = parseInt(id)
  try{
    const blockedUser = await adminRepository.blockUser(new_id)
    if(!blockedUser){
      return res.status(404).json({ error: 'User does not exists' })
    }
    return res.status(200).json({ message: 'User is successfuly blocked' })
  }catch(error){
    return res.status(500).json({ error: error.message })
  }
}


const unblockUser = async(req, res) => {
  const { id } = req.params
  try{
    const blockedUser = await adminRepository.unblockUser(id)
    if(!blockedUser){
      return res.status(404).json({ error: 'User does not exists' })
    }
    return res.status(200).json({ message: 'User is successfuly unblocked' })
  }catch(error){
    return res.status(500).json({ error: error.message })
  }
}


const deleteUser = async (req, res) =>{
  const { id } = req.params
  try{
    const deletedUser = await adminRepository.deleteUser(id)
    if(!deletedUser){
      return res.status(404).json({ error: 'User does not exists!' })
    }
    return res.status(200).json({ message : 'User is successfuly deleted!' })
  }catch(error){
    return res.status(400).json(error)
  }
}

const reports = async(req, res)  => {
  try{
    const reports = await adminRepository.getReports()
    if(!reports){
      return res.status(404).json( { error : 'No reports found ' })
    }
    res.status(200).render('admin_reports', { reports: reports }) 

  }catch(error){
    return res.status(400).json(error)
  }
}

const ads = async(req, res) => {
  try{
    const ads = await adminRepository.getAds()
    if(!ads){
      return res.status(404).json( { error : 'No ads found ' })
    }

    res.render('admin_ads', { ads : ads })


  }catch(error){
    return res.status(400).json({ error : error })
  }
}

const deleteAd = async(req, res) => {
  const { id } = req.params
  try{
    const deletedAd = await adminRepository.deleteAd(id)
    if(!deletedAd){
      return res.status(404).json({ error: 'ID for ad does not exists!' })
    }
    return res.status(200).json({ message : 'Ad is successfully deleted!' })

  }catch(error){
    return res.status(400).json({ error : error })
  }
}

const admin_homepage_fe = (req, res) => {
  res.render('admin_homepage.ejs', { username: req.user.name })
}






module.exports={
  blockUser,
  unblockUser,
  deleteUser,
  reports,
  ads,
  deleteAd,
  users,
  admin_homepage_fe,
  createUser
}