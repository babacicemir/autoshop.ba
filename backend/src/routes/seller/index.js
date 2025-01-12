const { Router } = require("express")
const multer = require("multer")
const Seller = require("../../controllers/seller")

const router = Router()
const upload = multer()

router.post("/add/create", upload.single('image'), Seller.createAdd)

module.exports = router