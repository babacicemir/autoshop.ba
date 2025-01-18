const { Router } = require('express')
const { checkJWT, checkAccess } = require('../../middlewares')
const Admin = require('../../controllers/admin')
const User = require('../../controllers')

const router = Router()


router.get('/users', checkJWT, checkAccess('admin'), Admin.users)
router.put('/block/:id', checkJWT, checkAccess('admin'), Admin.blockUser)
router.put('/unblock/:id', checkJWT, checkAccess('admin'), Admin.unblockUser)
router.post('/create', checkJWT, checkAccess('admin'), User.signup)  //ovde je iskoristena funkcija za signup, kako se ne bi ista funkcija dva puta ponavljala
router.delete('/delete/:id', checkJWT, checkAccess('admin'), Admin.deleteUser)
router.get('/reports', checkJWT, checkAccess('admin'), Admin.reports)
router.get('/ads', checkJWT, checkAccess('admin'), Admin.ads)
router.delete('/ads/delete/:id', checkJWT, checkAccess('admin'), Admin.deleteAd)
module.exports = router