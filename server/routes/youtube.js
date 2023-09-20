const express = require("express");
const youtubeController = require("../controllers/youtubeController");
const router = express.Router();

router.get("/getAudio", youtubeController.getAudio);
router.get("/search", youtubeController.searchVideo);

module.exports = router;
