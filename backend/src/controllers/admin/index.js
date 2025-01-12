const adminRepository = require('../../repositories/admin')


const users = async(req, res) => {
  try{
    const users = await adminRepository.getUsers()
    if(!users){
      return res.status(404).json( { error : 'No users found ' })
    }

    res.status(200).json( { message : users } )

  }catch(error){
    return res.status(500).json({ error })
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
    return res.status(200).json( { reports } )

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

    return res.status(200).json( { message : ads } )


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


module.exports={
  blockUser,
  unblockUser,
  deleteUser,
  reports,
  ads,
  deleteAd,
  users
}