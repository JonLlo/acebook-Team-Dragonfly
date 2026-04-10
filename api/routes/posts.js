console.log("POSTS ROUTER LOADED");

const express = require("express");
const router = express.Router();

const tokenChecker = require("../middleware/tokenChecker");
const PostsController = require("../controllers/posts");

// Public route
router.get("/", tokenChecker, PostsController.getAllPosts);

// Protected routes
router.post("/", tokenChecker, PostsController.createPost);
router.post("/:id/comments", tokenChecker, PostsController.createComment);
router.patch("/:id/likes", tokenChecker, PostsController.toggleLike);

module.exports = router;



// Password123!


