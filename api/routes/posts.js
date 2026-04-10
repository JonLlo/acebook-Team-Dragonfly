const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.getAllPosts);
router.post("/", PostsController.createPost);
router.post("/:id/comments", PostsController.createComment);
router.patch("/:id/likes", PostsController.toggleLike);

module.exports = router;
