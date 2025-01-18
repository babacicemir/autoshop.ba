const sellerRepository = require('../../repositories/seller')
const { getUserInformationsByToken } = require('../../utils')


const createAd = async (req, res) => {
  const { title, description, price, year, location, ownerID } = req.body
  const file = req.file

  if (!file) {
    return res.status(400).json({ error: 'Image is required' })
  }


  try {
    const publicUrl = await sellerRepository.uploadPicture(file)

    const ad = {
      ownerID,
      title,
      description,
      price,
      year,
      location,
      imageURL: publicUrl,
    }

    const createdAd = await sellerRepository.createAdd(ad)

    return res.status(200).json({ message: 'Ad created successfully!', ad: createdAd })
  } catch (error) {
    console.error('Error details:', error)
    return res.status(400).json({ error: error.message || 'An error occurred' })
  }
}


const reportUser = async (req, res) => {
  const { reason, details } = req.body
  const reportedUserId = req.params.id
  try{
    const user = await getUserInformationsByToken(req)
    const userId = user.id
    const reportInformations = {
      userId,
      reportedUserId,
      reason,
      details
    }
    const reportUser = await sellerRepository.reportedUser(reportInformations)
    if(!reportUser){
      return res.status(500).json( { error : 'Failed to report user' } )
    }
    return res.status(200).json({ message : 'User is successfully reported' })
  
  }catch(error){
    return res.status(400).json( { error : error.message } )
  }
}

const getAds = async(req, res) => {
  try{
    const user = await getUserInformationsByToken(req)
    const userId = user.id
    const ads = await sellerRepository.getAdsById(userId)
    if(!ads){
      return res.status(404).json({ error : 'No ads found!' })
    }
    return res.status(200).json( { message : ads } )

  }catch(error){
    return res.status(500).json( { error : error.message } )
  }
}

module.exports = { 
  createAd,
  reportUser,
  getAds
}

