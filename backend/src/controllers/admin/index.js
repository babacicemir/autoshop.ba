const adminRepository = require('../../repositories/admin')

const blockUser = async(req, res) => {
  const { id } = req.params
  const new_id = parseInt(id)
  try{
    const blockedUser = await adminRepository.blockUser(new_id)
    if(!blockedUser){
      return res.status(404).json({ error: 'User doesn\'t exists' })
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
      return res.status(404).json({ error: 'User doesn\'t exists' })
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
      return res.status(404).json({ error: 'User doesn\'t exists!' })
    }
    return res.status(200).json({ message : 'User is successfuly deleted!' })
  }catch(error){
    return res.status(400).json(error)
  }
}


module.exports={
  blockUser,
  unblockUser,
  deleteUser
}