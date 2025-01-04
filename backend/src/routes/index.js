const { Router } = require("express")
const userRouter = require("./users")
const adminRouter = require("./admin")

const router = Router()

router.use("/users", userRouter);
router.use("/admin", adminRouter);

module.exports = router