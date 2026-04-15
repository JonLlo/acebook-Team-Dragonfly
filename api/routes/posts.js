const express = require("express");
const router = express.Router();
const PostsController = require("../controllers/posts");




// Protected routes
router.get("/", PostsController.getAllPosts);
router.post("/", PostsController.createPost);
router.post("/:id/comments", PostsController.createComment);
router.patch("/:id/likes", PostsController.toggleLike);
router.delete("/:id", PostsController.deletePost);
router.patch("/:id", PostsController.editPostContent);

module.exports = router;

//// Password123!
