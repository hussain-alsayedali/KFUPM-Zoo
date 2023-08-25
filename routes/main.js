const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest , isAuthed } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/",isAuthed, homeController.getIndex);
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/createPost", ensureAuth, homeController.getCreatePostPage);
router.get("/hallOfFame", isAuthed, homeController.getHallOfFame )


router.get("/login",isAuthed ,authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup",isAuthed ,authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
