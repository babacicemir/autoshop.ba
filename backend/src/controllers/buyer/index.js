const buyerRepository = require('../../repositories/buyer')
const { getUserInformationsByToken } = require('../../utils')


const allAds = async (req, res) => {
  try{
    const ads = await buyerRepository.getAllAds()
    if(!ads){
      return res.status(404).json({ error : 'Ads are not found!' })
    }
    return res.status(200).render("buyer_all_ads_without_token", { ads : ads })

  }catch(error){
    return res.status(400).json( { error : error.message } )
  }
}

const reportUser = async (req, res) => {
  const { reason, details } = req.body
  const { id } = req.params
  try{
   
    const userId = req.user.id
    const reportInformations = {
      userId,
      reportedUserId : id,
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
    const informations = {
      userId : req.user.id,
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
    console.log(id, req.user.id)
    const informationsAd = {
      userId : req.user.id,
      adId : id
    }
    const deletedAd = await buyerRepository.deleteSavedAdByIds(informationsAd)
    if(!deletedAd){
      return res.status(404).json({ error : 'Ad is not found!' })
    }
    return res.status(200).json({ message : 'Saved ad is successfully deleted!' })
  }catch(error){
    return res.status(500).json({ error : error.message })
  }
}

const deleteAd = async (req, res) => {
  const { id } = req.params
  try{
    console.log(id, req.user.id)
    const informationsAd = {
      userId : req.user.id,
      savedAdId : id
    }
    const deletedAd = await buyerRepository.deleteSavedAdByIds(informationsAd)
    if(!deletedAd){
      return res.status(404).json({ error : 'Ad is not found!' })
    }
    return res.status(200).json({ message : 'Saved ad is successfully deleted!' })
  }catch(error){
    return res.status(500).json({ error : error.message })
  }
}

const getSavedAds = async (req, res) => {
  try{
    const userId = req.user.id
    const savedAds = await buyerRepository.getAllSavedAdsByUserId(userId)
    if(!savedAds){
      return res.status(404).json({ error : 'Saved ads are not found' })
    }
    return res.status(200).render("buyer_saved_ads", { ads : savedAds })

  }catch(error){
    return res.status(500).json({ error : error.message })
  }
}


const sendBid = async(req, res) => {
  const { bidPrice, message } = req.body
  const { id } = req.params
  try{
    const user = req.user.id 
    const bidInformations = {
      userId : user.id,
      bidPrice,
      message,
      adId : id
    }
    const sentBid = await buyerRepository.sendBid(bidInformations)
    if(!sentBid){
      return res.status(500).json( { message : 'Failed to send bid!' } )
    }
    return res.status(200).json ({ message : 'Bid is successfully sent!' })

  }catch(error){
    return res.status(500).json({ error : error.message })
  }
}

const allAds_homepage_fe = async (req, res) => {
  try{
    const ads = await buyerRepository.getAllAds()
    if(!ads){
      return res.status(404).json({ error : 'Ads are not found!' })
    }
    return res.status(200).render("buyer_homepage", { ads : ads })

  }catch(error){
    return res.status(400).json( { error : error.message } )
  }
}

const getAd = async(req, res) => {
  const { id } = req.params
  try{
    const ad = await buyerRepository.getAdById(id)
    console.log(ad)
    if(!ad) {
      return res.status(404).json( { error : 'Ad not found!'})
    }
    return res.status(200).render("buyer_view_ad", { ad : ad })
  }
  catch(error){
    return res.status(400).json( { error : error.message } )
  }
}

const welcome_page_fe = async(req, res) => {
  res.render("buyer_welcome_page", { username : req.user.name })
}

module.exports = {
  allAds,
  reportUser,
  saveAd,
  deleteSavedAd,
  getSavedAds,
  sendBid,
  allAds_homepage_fe,
  deleteAd,
  welcome_page_fe,
  getAd
}