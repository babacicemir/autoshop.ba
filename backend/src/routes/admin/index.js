const { Router } = require('express')
const { checkJWT, checkAccess } = require('../../middlewares')
const Admin = require('../../controllers/admin')

const router = Router()


//router.get('/users', checkJWT, checkAccess('admin'), Admin.users)
router.put('/block/:id', checkJWT, checkAccess('admin'), Admin.blockUser)
router.put('/unblock/:id', checkJWT, checkAccess('admin'), Admin.unblockUser)
router.post('/create', checkJWT, checkAccess('admin'), Admin.createUser)  
router.delete('/delete/:id', checkJWT, checkAccess('admin'), Admin.deleteUser)
router.get('/reports', checkJWT, checkAccess('admin'), Admin.reports)
router.get('/ads', checkJWT, checkAccess('admin'), Admin.ads)
router.delete('/ads/delete/:id', checkJWT, checkAccess('admin'), Admin.deleteAd)

router.get('/homepage', checkJWT, checkAccess('admin'), Admin.admin_homepage_fe)
router.get('/users', checkJWT, checkAccess('admin'), Admin.users)

module.exports = router