const mongoose = require("mongoose");
const imageURL = "../images/";

// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.
const PostSchema = new mongoose.Schema(
  {
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    postContent: { type: String, required: true,  trim:true},
    postImage: {
      type: String,

      get: (v) => {
        if (!v) return null;
        return v.startsWith(imageURL) ? v : `${imageURL}${v}`
      },
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  },
);

const CommentSchema = new mongoose.Schema(
  {
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    commentContent: { type: String },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  },
  { timestamps: true },
);

// We use the Schema to create the Post model. Models are classes which we can
// use to construct entries in our Database.
const Post = mongoose.model("Post", PostSchema);
const Comment = mongoose.model("Comment", CommentSchema);

// These lines will create a test post every time the server starts.
// You can delete this once you are creating your own posts.
// const dateTimeString = new Date().toLocaleString("en-GB");
// new Post({ postContent: `Test message, created at ${dateTimeString}` }).save();

module.exports = { Post, Comment };
