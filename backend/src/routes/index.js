const { Router } = require('express')
const userRouter = require('./users')
const adminRouter = require('./admin')
const sellerRouter = require('./seller')
const buyerRouter = require('./buyer')

const router = Router()

router.use('/autoshop.ba', userRouter)
router.use('/admin', adminRouter)
router.use('/seller', sellerRouter)
router.use('/buyer', buyerRouter)


module.exports = router