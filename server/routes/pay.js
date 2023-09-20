const express = require("express");
const router = express.Router();
const MidtransController = require("../controllers/midtransController");

router.get("/get-payment", MidtransController.getPayment);
router.get("/update-status", MidtransController.verifyPayment);

module.exports = router;
