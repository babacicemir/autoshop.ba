const { Router } = require('express')
const { checkJWT, checkAccess } = require('../../middlewares')
const Buyer = require('../../controllers/buyer')

const router = Router()


router.get('/welcome', checkJWT, checkAccess('buyer'), Buyer.welcome_page_fe)
router.get('/homepage', checkJWT, checkAccess('buyer'), Buyer.allAds_homepage_fe)
router.get('/ad/:id', checkJWT, checkAccess('buyer'), Buyer.getAd)
router.get('/ads', Buyer.allAds) //ruta bez tokena
router.post('/user/report/:id', checkJWT, checkAccess('buyer'), Buyer.reportUser )
router.post('/ad/save/:id', checkJWT, checkAccess('buyer'), Buyer.saveAd)
router.delete('/ad/saved/delete/:id', checkJWT, checkAccess('buyer'), Buyer.deleteAd)
router.get('/ads/saved', checkJWT, checkAccess('buyer'), Buyer.getSavedAds)
router.post('/ad/bid/:id', checkJWT, checkAccess('buyer'), Buyer.sendBid)


module.exports = router