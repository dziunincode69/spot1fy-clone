const express = require("express");
const router = express.Router();
const api = require("./api");
const youtube = require("./youtube");
const pay = require("./pay");
const { Authentication } = require("../middlewares/guard");
const user = require("./user");

router.use("/", user);

router.use(Authentication);
router.use("/pay", pay);
router.use("/api", api);
router.use("/youtube", youtube);

module.exports = router;
