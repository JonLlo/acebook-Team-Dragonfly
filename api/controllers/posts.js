const {Post, Comment} = require("../models/post");
const { generateToken } = require("../lib/token");



//This is returning all embeded documents and unnessesary Mongodb data
//Can prorbaly be deleted if the getAllPosts
async function getAllPostsRaw(req,res){
 try{ 
  const posts = await Post.find()
  .populate("authorId", "firstName surname email postImage")
  .populate({
    path: "comments",
    populate:{
      path: "authorId",
      select:"firstName surname email"
    }
})
.populate("likes", "userImage firstName surname")
.sort({createdAt:-1});

return res.status(200).json({posts:posts});
}catch(error){
  return res.status(500).json({
      message:"Server error returning posts",
    });
}
}

//This returns all post data with embedded document data
// in a formatted "front-end" friendly structure

async function getAllPosts(req, res) {
  try {
    const posts = await Post.find()
      .populate("authorId", "firstName surname userImage")
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
      updatedAt: post.updatedAt,

      author: post.authorId
        ? {
            _id: post.authorId._id,
            firstName: post.authorId.firstName,
            surname: post.authorId.surname,
            userImage: post.authorId.userImage,
          }
        : null,

      likesCount: post.likes.length,
      likedByCurrentUser: post.likes.some(
        (likedUserId) => likedUserId.toString() === req.user_id
      ),

      commentsCount: post.comments.length,

      comments: post.comments
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        .map((comment) => ({
          _id: comment._id,
          commentContent: comment.commentContent,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,

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
      posts: formattedPosts,
    });
  } catch (err) {
    console.error("GET POSTS ERROR:", err);
    return res.status(500).json({
      message: "Error fetching posts",
    });
  }
}





async function createPost(req,res){
  try{
    const postContent = req.body.postContent;
    if(!postContent){
      return res.status(400).json({
        message: "Post content is required",
      })
    };
    const post = await new Post({
      postContent,
      authorId: req.user_id,
    }).save();

    const populatedPost = await Post.findById(post.id).populate(
      "authorId",
      "email firstName surname userImage",
    )
    
    return res.status(201).json({
      message: "Post successfully created",
      post:populatedPost,
    })
  }catch(error){
    return res.status(500).json({
      message:"Server error creating post",
    });

  }
  
}

async function  createComment(req,res){
  try{
      const postId = req.params.id;

      //check for comment text
      const commentContent = req.body.commentContent;
      if(!commentContent){
        res.status(400).json({message: "Comment content is required"})
      }

    //check post exists
    const post = await Post.findById(postId);

    if(!post){
      res.status(400).json({message: "Post does not exist"})
    }

    //create comment and save
    const comment = await new Comment({
      authorId: req.user_id,
      commentContent:commentContent,
      postId:postId
    }).save();


    //add comments to post-comments array
    post.comments.push(comment._id);
    await post.save();
    
    //populate comments

    const populatedComment = await Comment.findById(comment._id).populate(
      "authorId",
      "userImage email"
    )
    return res.status(201).json({
      message:"Comment added",
      comment:populatedComment,
    });

  }catch(error){
    return res.status(500).json({
      message:"Server error adding comment",
    });
  }
}
/*Functionality user clicks like button
if user hasn't liked the post ---> add them to likes array
it user has already liked post ---> remove fromm likes array*/
async function toggleLike(req,res){
  try{
    const postId = req.params.id;
    const userId = req.user_id;

    const post = await Post.findById(postId);

    if(!post){
      return res.status(404).json({
        message: "Post does not exist",
      });
    }

    //returns true if user id found in post likes array else false
    const alreadyLiked = post.likes.some(
      (likedUserId) =>likedUserId.toString() == userId
    );

    //if already like remove from likes array otherwise add to the array
    alreadyLiked?
      post.likes = post.likes.filter(
        (likedUserId) => likedUserId.toString() !== userId
      ):
      post.likes.push(userId)

    //save the update to the post in db
    await post.save()

    return res.status(200).json({
      message: alreadyLiked ? "Post unliked": "Post liked",
      likedByCurrentUser: !alreadyLiked,
      likesCount:post.likes.length,
    });

  }catch(error){
    console.log("TOGGLE LIKE ERROR", error);
    return res.status(500).json({
      message: "Server error updating likes"
    })

  }
}


const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  createComment: createComment,
  toggleLike: toggleLike
};

module.exports = PostsController;
