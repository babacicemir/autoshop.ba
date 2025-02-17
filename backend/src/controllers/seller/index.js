const sellerRepository = require('../../repositories/seller')
const { getUserInformationsByToken } = require('../../utils')


const createAd = async (req, res) => {
  const { title, description, price, year, location } = req.body
  const ownerID = req.user.id
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
    const userId = req.user.id
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
    const userId = req.user.id
    const ads = await sellerRepository.getAdsById(userId)
    if(!ads){
      return res.status(404).json({ error : 'No ads found!' })
    }
    res.status(200).render('seller_my_ads', { ads : ads } )

  }catch(error){
    return res.status(500).json( { error : error.message } )
  }
}

const deleteAd = async(req, res) => {
  const { id } = req.params
  try{
    const deletedAd = await sellerRepository.deleteAdById(id)
    if(!deletedAd){
      return res.status(404).json({ error: 'ID for ad does not exists!' })
    }
    return res.status(200).json({ message : 'Ad is successfully deleted!' })
  }catch(error){
    res.status(400).json({ error : error })
  }
}

const getAllBids = async(req, res) => {
  try{
    const userId = req.user.id
    const bids = await sellerRepository.getAllBidsByUserId(userId)
    if(!bids){
      res.status(404).json({ message : 'Bids not found!' })
    }
    res.status(200).render('seller_offers', { offers : bids })

  }catch(error){
    res.status(400).json({ error : error })
  }
}

const acceptBid = async (req, res) => {
  const { id, adId } = req.params;
  try {
    const bid = await sellerRepository.acceptBid(id);

    if (!bid) {
      return res.status(404).json({ message: "Bid not found!" });
    }

    const changeAdStatus = await sellerRepository.changeAdStatus(adId)
    if (!changeAdStatus) {
      return res.status(404).json({ message: "Ad not found!" });
    }

    res.status(200).json({ message: "Bid is accepted!" });

  } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
  }
};



const rejectBid = async(req, res) => {
  const { id } = req.params
  try{
    
    const bid = await sellerRepository.rejectBid(id)
    if(!bid){
      return res.status(404).json({ message : 'Bid not found!' })
    }
    return res.status(200).json({ message : 'Bid is rejected!' })

  }catch(error){
  return res.status(400).json({ error : error })
}
}

const seller_homepage_fe = (req, res) =>{
  res.render('seller_homepage', { username : req.user.name })
}

const seller_create_ad_fe = (req, res) => {
  res.render('seller_create_ad')
}

module.exports = { 
  createAd,
  reportUser,
  getAds,
  deleteAd,
  getAllBids,
  acceptBid,
  rejectBid,
  seller_homepage_fe, 
  seller_create_ad_fe
}

