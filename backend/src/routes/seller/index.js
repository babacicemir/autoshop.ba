const { Router } = require('express')
const multer = require('multer')
const Seller = require('../../controllers/seller')

const router = Router()
const upload = multer()

router.post('/ad/create', upload.single('image'), Seller.createAd)

module.exports = router