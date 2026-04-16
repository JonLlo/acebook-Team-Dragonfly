import { useState } from "react";
import LikeButton from "./LikeButton";
import PostInfo from "./PostInfo";
import Comment from "./Comment";
import { addCommentToPost, toggleLike } from "../services/posts";
import "./Post.css"

const Post = (props) => {
  const [youLike, setYouLike] = useState(props.likedByCurrentUser); //need to get this from backend!!
  const [likesCount, setLikesCount] = useState(props.likesCount ?? 0);
  const [comments, setComments] = useState(props.comments || []);
  const [commentContent, setCommentContent] = useState("");
  const [error, setError] = useState("");

  const handleLikeToggle = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    //sending to database
    try {
      const result = await toggleLike(props._id, token);
      setYouLike(result.likedByCurrentUser);
      setLikesCount(result.likesCount);
    } catch (err) {
      console.error("Failed to toggle like", err);
    }
  };

  async function handleSubmitComment(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");

    if (commentContent.trim() === "") {
      setError("Please enter a valid comment");
      return;
    }

    try {
      const newCommentObject = await addCommentToPost(
        props._id,
        commentContent,
        token,
      );
      const newComment = newCommentObject.comment;

      const normalized = {
        _id: newComment._id,
        commentContent: newComment.commentContent,
        createdAt: newComment.createdAt,
        updatedAt: newComment.updatedAt,
        author: {
          _id: newComment.authorId._id,
          firstName: newComment.authorId.firstName || "",
          surname: newComment.authorId.surname || "",
          userImage: newComment.authorId.userImage,
        },
        isNew: true,
      };
      setComments([...comments, normalized]);
      setCommentContent("");
      setError("");
    } catch (err) {
      console.error(err);
      setError(["Comment failed to post. Please try again."]);
    }
  }

  function handleCommentContentChange(event) {
    setCommentContent(event.target.value);
  }
  
return (
  <div className="post-container">
    <PostInfo
      author={props.author}
      content={props.postContent}
      datetime={props.createdAt}
    />

    <div className="like-section">
      <LikeButton youLike={youLike} ToggleYouLike={handleLikeToggle} />
      <span className="likes-count">{likesCount} Likes</span>
    </div>

    <div className="comments-section">
      <Comment comments={comments} />
    </div>

    {error && <p className="comment-error">{error}</p>}

    <form
      className="add-comment-form"
      method="post"
      onSubmit={handleSubmitComment}
    >
      <input
        className="add-comment-input"
        placeholder="Add a comment..."
        value={commentContent}
        onChange={handleCommentContentChange}
        type="text"
        name="comment"
      />
      <input
        className="add-comment-btn"
        type="submit"
        value="Post Comment"
      />
    </form>
  </div>
);
};

export default Post;
