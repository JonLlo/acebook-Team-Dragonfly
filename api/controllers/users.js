const User = require("../models/user");
const {Post} = require("../models/post")
const bcrypt = require("bcrypt");

async function create(req, res) {
  try {
    const {
      firstName,
      surname,
      userImage,
      userBiography,
      email,
      password: plainTextPassword,
    } = req.body;

    const password = await bcrypt.hash(plainTextPassword, 10);

    const user = new User({
      firstName,
      surname,
      userImage,
      userBiography,
      email,
      password,
    });

    const savedUser = await user.save();

    console.log("User created, id:", savedUser._id.toString());
    res.status(201).json({ message: "OK" });
  } catch (err) {
    console.error("Error in create user:", err);
    res.status(400).json({ message: "Something went wrong" });
  }
}

async function getUserProfile(req, res) {
  try {
    const userId = req.user_id;
    // get user info
    const user = await User.findById(userId).select(
      "firstName surname userImage userBiography email friends notificationsArray",
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const posts = await Post.find({ authorId: userId })
      .populate({
        path: "comments",
        populate: {
          path: "authorId",
          select: "firstName surname userImage",
        },
      })
      .sort({ createdAt: -1 });

    const formattedPosts = posts.map((post) => ({
      _id: post._id,
      postContent: post.postContent,
      postImage: post.postImage,
      createdAt: post.createdAt,
      likesCount: post.likes.length,
      commentsCount: post.comments.length,
      comments: post.comments
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        .map((comment) => ({
          _id: comment._id,
          commentContent: comment.commentContent,
          createdAt: comment.createdAt,
          author: comment.authorId
            ? {
                _id: comment.authorId._id,
                firstName: comment.authorId.firstName,
                surname: comment.authorId.surname,
                userImage: comment.authorId.userImage,
              }
            : null,
        })),
    }));
    return res.status(200).json({
      user: {
        _id: user._id,
        firstname: user.firstName,
        surname: user.surname,
        userImage: user.userImage,
        userBiography: user.userBiography,
        email: user.email,
        createdAt: user.createdAt,
      },
      post: formattedPosts,
    });
  } catch (error) {
    console.error("Error in fetching user profile:", error);
    res.status(400).json({ message: "Server error fetching user profile" });
  }
}

const UsersController = {
  create: create,
  getUserProfile: getUserProfile,
};

module.exports = UsersController;
