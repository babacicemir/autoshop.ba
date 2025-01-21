const buyerRepository = require("../../repositories/buyer")

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

module.exports = {
    allAds,
}