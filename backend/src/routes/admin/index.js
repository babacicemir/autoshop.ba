const { Router } = require('express')
const Admin = require('../../controllers/admin')
const User = require('../../controllers')

const router = Router()


router.get('/users', Admin.users)
router.put('/block/:id', Admin.blockUser)
router.put('/unblock/:id', Admin.unblockUser)
router.post('/create', User.signup)  //ovde je iskoristena funkcija za signup, kako se ne bi ista funkcija dva puta ponavljala
router.delete('/delete/:id', Admin.deleteUser)
router.get('/reports', Admin.reports)
router.get('/ads', Admin.ads)
router.delete('/ads/delete/:id', Admin.deleteAd)
module.exports = router