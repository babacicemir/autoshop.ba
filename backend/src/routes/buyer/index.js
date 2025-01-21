const { Router } = require('express')
const { checkJWT, checkAccess } = require('../../middlewares')
const Buyer = require("../../controllers/buyer")

const router = Router()

router.get('/ads', Buyer.allAds)

module.exports = router