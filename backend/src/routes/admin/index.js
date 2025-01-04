const { Router } = require("express");
const Admin = require("../../controllers/admin")

const router = Router();

router.put("/block/:id", Admin.blockUser);
router.put("/unblock/:id", Admin.unblockUser);
module.exports = router;