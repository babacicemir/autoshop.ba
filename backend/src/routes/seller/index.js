const { Router } = require('express')
const { checkJWT, checkAccess } = require('../../middlewares')
const multer = require('multer')
const Seller = require('../../controllers/seller')

const router = Router()
const upload = multer()

router.post('/ad/create', upload.single('image'), checkJWT, Seller.createAd)
router.post('/user/report/:id', checkJWT, checkAccess('seller'), Seller.reportUser )
router.get('/myads', checkJWT, checkAccess('seller'), Seller.getAds)

module.exports = router