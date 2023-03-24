const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");

const { ensureAuth, ensureGuest } = require("../middleware/auth");



// router.get("/:postid", commentsController.getComments)
router.post("/createComment/:postid" ,ensureAuth, commentsController.createComment);









module.exports = router;