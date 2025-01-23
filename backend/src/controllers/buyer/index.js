const buyerRepository = require("../../repositories/buyer")
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

module.exports = {
    allAds,
    reportUser,
}