import { useState } from "react";
import LikeButton from "./LikeButton";
import PostInfo from "./PostInfo";
import CommentList from "./CommentList";


// Post.jsx
const Post = (props) => {
  

  const [youLike, setYouLike] = useState(props.youLike); //need to get this from backend!!
  const [likesCount, setLikesCount] = useState(props.likes?.length || 0);

  const [comments, setComments] = useState(props.comments || []);
  







const handleLikeToggle = async () => {

  console.log("TOGGGLE")
  console.log(youLike)

  const token = localStorage.getItem("token"); 
  
  if (!token) {
    console.error("No token found in localStorage!");
    return; 
  }

  // const newLikeStatus = youLike ? !youLike : youLike
  
    setYouLike(!youLike);
    setLikesCount(youLike ? likesCount -1 : likesCount + 1);
  

  // try {
  //   await updatePostLike(props._id, newLikeStatus, token); 
  //   console.log("Database updated successfully");
  // } catch (err) {
  //   setYouLike(!newLikeStatus);
  //   setLikesCount(youLike ? likesCount : likesCount + 1);
  //   console.error("Failed to save like:", err);
  // }
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

       <div className="comments-section">
        <CommentList comments={comments}/>       
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