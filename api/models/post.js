const mongoose = require("mongoose");

// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.
const PostSchema = new mongoose.Schema({
  //authorId: {type: mongoose.Schema.Types.ObjectId, ref:"User", required: true},
  postContent: {type: String, required: true},
  authorImage: {type: String, default: "../public/images/defaultAvatar" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  //YouLike: true/false
  //
}, {timestamps: true});

const CommentSchema = new mongoose.Schema({
authorId: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
commentContent: {type: String},
postId: {type: mongoose.Schema.Types.ObjectId, ref:"Post"}
},
{timestamps:true})

// We use the Schema to create the Post model. Models are classes which we can
// use to construct entries in our Database.
const Post = mongoose.model("Post", PostSchema);
const Comment = mongoose.model("Comment", CommentSchema);

// These lines will create a test post every time the server starts.
// You can delete this once you are creating your own posts.
const dateTimeString = new Date().toLocaleString("en-GB");
new Post({ postContent: `Test message 1, created at ${dateTimeString}` }).save();

module.exports = Post;
