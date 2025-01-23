const { Router } = require('express')
const { checkJWT, checkAccess } = require('../../middlewares')
const Buyer = require("../../controllers/buyer")

const router = Router()

router.get('/ads', Buyer.allAds)
router.post('/user/report/:id', checkJWT, checkAccess('buyer'), Buyer.reportUser )


module.exports = router