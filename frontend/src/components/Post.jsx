import { useState } from "react";
import LikeButton from "./LikeButton";
import PostInfo from "./PostInfo";


// Post.jsx
const Post = (props) => {

  const [youLike, setYouLike] = useState(false);
  const [likesCount, setLikesCount] = useState(props.likes?.length || 0);


const handleLikeToggle = async () => {
  const token = localStorage.getItem("token"); 
  
  if (!token) {
    console.error("No token found in localStorage!");
    return; 
  }

  const newLikeStatus = !youLike;
  
  setYouLike(newLikeStatus);
  setLikesCount(newLikeStatus ? likesCount + 1 : likesCount - 1);

  try {
    await updatePostLike(props._id, newLikeStatus, token); 
    console.log("Database updated successfully");
  } catch (err) {
    setYouLike(!newLikeStatus);
    setLikesCount(youLike ? likesCount + 1 : likesCount - 1);
    console.error("Failed to save like:", err);
  }
};

  return (
    <div className="post-container" style={{ borderBottom: "1px solid #eee", padding: "20px" }}>
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
    </div>
  );
};

// const Post = (props) => {
  
// const [youLike, ToggleYouLike] = useState(false);



  


//   console.log(props)
//   return (
//   <div className = "postDiv">
//     <LikeButton youLike = {youLike} ToggleYouLike= {ToggleYouLike} /> 
    
//     <PostInfo id = {props.id} author_id={props.authorId} author_name = {props.authorName} content = {props.content} img = {props.img} datetime = {props.datetime} comments = {props.comments} time = {props.time} />
    
//   </div>
// )

// };

export default Post;