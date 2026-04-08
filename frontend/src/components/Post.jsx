import { useState } from "react";
import LikeButton from "./LikeButton";
import PostInfo from "./PostInfo";


const Post = (props) => {
  
const [youLike, ToggleYouLike] = useState(false);



  


  console.log(props)
  return (
  <div className = "postDiv">
    <LikeButton youLike = {youLike} ToggleYouLike= {ToggleYouLike} /> 
    
    <PostInfo id = {props.id} author_id={props.authorId} author_name = {props.authorName} content = {props.content} img = {props.img} datetime = {props.datetime} comments = {props.comments} time = {props.time} />
    
  </div>
)




};

export default Post;