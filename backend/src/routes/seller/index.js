const { Router } = require('express')
const { checkJWT } = require("../../middlewares")
const multer = require('multer')
const Seller = require('../../controllers/seller')

const router = Router()
const upload = multer()

router.post('/ad/create', upload.single('image', checkJWT), Seller.createAd)

module.exports = router