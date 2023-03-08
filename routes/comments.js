const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");

// const { ensureAuth, ensureGuest } = require("../middleware/auth");



// router.get("/:postid", commentsController.getComments)
router.post("/createComment/:postid" , commentsController.createComment);


// router.put("/upvoteComment", ensureAuth , commentsController.upvoteComment);
// router.put("/downvoteComment", ensureAuth , commentsController.downvoteComment);


// router.delete("/deleteComment", ensureAuth , commentsController.deleteComment);







module.exports = router;