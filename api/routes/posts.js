
const express = require("express");
const router = express.Router();

const tokenChecker = require("../middleware/tokenChecker");
const PostsController = require("../controllers/posts");

// Public route
router.get("/", tokenChecker, PostsController.getAllPosts);

// Protected routes
router.post("/",  PostsController.createPost);
router.post("/:id/comments",  PostsController.createComment);
router.patch("/:id/likes", PostsController.toggleLike);
router.delete("/:id", PostsController.deletePost);
router.patch("/:id", PostsController.editPostContent)

module.exports = router;



//// Password123!


