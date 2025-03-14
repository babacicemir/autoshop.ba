const { Router } = require('express')
const { checkJWT, checkAccess } = require('../../middlewares')
const multer = require('multer')
const Seller = require('../../controllers/seller')

const router = Router()
const upload = multer()

router.post('/ad/create', upload.single('image'), checkJWT, Seller.createAd)
router.post('/user/report/:id', checkJWT, checkAccess('seller'), Seller.reportUser )
router.get('/myads', checkJWT, checkAccess('seller'), Seller.getAds)
router.delete('/ad/delete/:id', checkJWT, checkAccess('seller'), Seller.deleteAd)
router.get('/bids', checkJWT, checkAccess('seller'), Seller.getAllBids)
router.put('/bid/accept/:id/:adId', checkJWT, checkAccess('seller'), Seller.acceptBid)
router.put('/bid/reject/:id', checkJWT, checkAccess('seller'), Seller.rejectBid)
router.get('/homepage', checkJWT, checkAccess('seller'), Seller.seller_homepage_fe)
router.get('/create/ad', checkJWT, checkAccess('seller'), Seller.seller_create_ad_fe)

module.exports = router