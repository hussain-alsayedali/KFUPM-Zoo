const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest,isAuthed } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", isAuthed ,postsController.getPost);
router.get("/getPostComments/:id", postsController.getPostComments);

router.post("/createPost",ensureAuth, upload.single("file"), postsController.createPost);

router.put("/likePost/:id",ensureAuth, postsController.likePost);
router.put("/dislikePost/:id",ensureAuth, postsController.dislikePost);
router.put("/addFavorite/:postid",ensureAuth, postsController.addRemoveFavorite)

router.delete("/deletePost/:id",ensureAuth, postsController.deletePost);

module.exports = router;
