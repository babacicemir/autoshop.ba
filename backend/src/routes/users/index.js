const { Router } = require('express')
const User = require('../../controllers/index')

const router = Router()

router.post('/signup', User.signup)
router.post('/login', User.login)


module.exports = router
