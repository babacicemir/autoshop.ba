const { Router } = require('express')
const User = require('../../controllers/index')

const router = Router()

router.post('/signup', User.signup)
router.post('/login', User.login)


router.get('/', User.homepage_fe)
router.get('/login', User.login_fe)
router.get('/signup', User.signup_fe)
router.post('/logout', User.logoutUser)

module.exports = router
