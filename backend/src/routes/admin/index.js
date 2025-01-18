const { Router } = require('express')
const { checkJWT } = require("../../middlewares")
const Admin = require('../../controllers/admin')
const User = require('../../controllers')

const router = Router()


router.get('/users', checkJWT, Admin.users)
router.put('/block/:id', checkJWT, Admin.blockUser)
router.put('/unblock/:id', checkJWT, Admin.unblockUser)
router.post('/create', checkJWT, User.signup)  //ovde je iskoristena funkcija za signup, kako se ne bi ista funkcija dva puta ponavljala
router.delete('/delete/:id', checkJWT, Admin.deleteUser)
router.get('/reports', checkJWT, Admin.reports)
router.get('/ads', checkJWT, Admin.ads)
router.delete('/ads/delete/:id', checkJWT, Admin.deleteAd)
module.exports = router