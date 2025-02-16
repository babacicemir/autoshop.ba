const { Router } = require('express')
const { checkJWT, checkAccess } = require('../../middlewares')
const Buyer = require('../../controllers/buyer')

const router = Router()

router.get('/ads', Buyer.allAds)
router.post('/user/report/:id', checkJWT, checkAccess('buyer'), Buyer.reportUser )
router.post('/ad/save/:id', checkJWT, checkAccess('buyer'), Buyer.saveAd)
router.delete('/ad/saved/delete/:id', checkJWT, checkAccess('buyer'), Buyer.deleteSavedAd)
router.get('/ads/saved', checkJWT, checkAccess('buyer'), Buyer.getSavedAds)
router.post('/ad/bid/:id', checkJWT, checkAccess('buyer'), Buyer.sendBid)


module.exports = router