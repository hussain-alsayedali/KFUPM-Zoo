const express = require("express");
const router = express.Router();
const feedController = require("../controllers/feed");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.get("/", feedController.getFeedLimited);



module.exports = router;