import { useState } from "react";
import LikeButton from "./LikeButton";
import PostInfo from "./PostInfo";
import CommentList from "./CommentList";
import { toggleLike } from "../services/posts";

// Post.jsx
const Post = (props) => {
  // const [youLike, setYouLike] = useState(props.youLike); //need to get this from backend!!
  // const [likesCount, setLikesCount] = useState(props.likes?.length || 0);
  const [youLike, setYouLike] = useState(props.likedByCurrentUser); //need to get this from backend!!
  const [likesCount, setLikesCount] = useState(props.likesCount);

  const [comments, setComments] = useState(props.comments || []);

  const handleLikeToggle = async () => {
   

    const token = localStorage.getItem("token");
    console.log("TOKEN IN handleliketoggle", token)

    if (!token) {
      console.error("No token found in localStorage!");
      return;
    }


   

//sending to database
    try {
    console.log("Props here1: " + props)
    console.log("Props here2: " + props._id)

    const result = await toggleLike(props._id, token);

    setYouLike(result.likedByCurrentUser);
    setLikesCount(result.likesCount);
  } catch (err) {
    console.error("Failed to toggle like", err);
  }

//keeping in UI
    // setYouLike(!youLike);
    // setLikesCount(youLike ? likesCount -1 : likesCount + 1);



  };

  return (
    <div
      className="post-container"
      style={{ borderBottom: "1px solid #eee", padding: "20px" }}
    >
      <PostInfo
        authorName={props.authorId}
        content={props.postContent}
        img={props.image}
        datetime={props.datetime}
      />

      <div className="like-section">
        <LikeButton youLike={youLike} ToggleYouLike={handleLikeToggle} />
        <span>{likesCount} Likes</span>
      </div>

      <div className="comments-section">
        <CommentList comments={comments} />
      </div>
    </div>
  );
};


export default Post;
