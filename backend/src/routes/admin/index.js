const { Router } = require('express')
const Admin = require('../../controllers/admin')
const User = require('../../controllers')

const router = Router()

router.put('/block/:id', Admin.blockUser)
router.put('/unblock/:id', Admin.unblockUser)
router.post('/create', User.signup)  //ovde je iskoristena funkcija za signup, kako se ne bi ista funkcija dva puta ponavljala
router.delete('/delete/:id', Admin.deleteUser)
module.exports = router