const buyerRepository = require('../../repositories/buyer')
const { getUserInformationsByToken } = require('../../utils')


const allAds = async (req, res) => {
  try{
    const ads = await buyerRepository.getAllAds()
    if(!ads){
      return res.status(404).json({ error : 'Ads are not found!' })
    }
    return res.status(200).json({ message : ads })

  }catch(error){
    return res.status(400).json( { error : error.message } )
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
    const reportUser = await buyerRepository.reportedUser(reportInformations)
    if(!reportUser){
      return res.status(500).json( { error : 'Failed to report user' } )
    }
    return res.status(200).json({ message : 'User is successfully reported' })
    
  }catch(error){
    return res.status(400).json( { error : error.message } )
  }
}

const saveAd = async(req, res) => {
  const { id } = req.params

  try{
    const user = await getUserInformationsByToken(req)
    const informations = {
      userId : user.id,
      adId : id
    }
    const savedAd = await buyerRepository.saveAd(informations)
    if(!savedAd){
      return res.status(500).json({ error : 'Failed to save the ad!' })

    }
    return res.status(200).json( { message : 'Ad is successfully saved!' } )

  }catch(error){
    return res.status(400).json( { error : error.message } )
  }
}

const deleteSavedAd = async (req, res) => {
    const { id } = req.params
    try{
        const user = await getUserInformationsByToken(req)
        const informationsAd = {
            userId : user.id,
            adId : id
        }
        const deletedAd = await buyerRepository.deleteSavedAdByIds(informationsAd)
        if(!deletedAd){
            return res.status(404).json({ error : 'Ad is not found!' })
        }
        return res.status(200).json({message : 'Saved ad is successfully deleted!'})
    }catch(error){
        return res.status(500).json({ error : error.message })
    }
}

module.exports = {
  allAds,
  reportUser,
  saveAd,
  deleteSavedAd
}