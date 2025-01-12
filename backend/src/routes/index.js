const { Router } = require('express')
const userRouter = require('./users')
const adminRouter = require('./admin')
const sellerRouter = require('./seller')

const router = Router()

router.use('/users', userRouter)
router.use('/admin', adminRouter)
router.use('/seller', sellerRouter)

module.exports = router