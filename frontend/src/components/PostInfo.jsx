import "./PostInfo.css";
import { formatDistanceToNow } from "date-fns";


const PostInfo = (props) => {
   console.log("PROPS4--->", props)
  const timeSincePosted = formatDistanceToNow(new Date(props.datetime), {
    addSuffix: true,
  });
  // We need to extract the string values from the object
  // We use "Optional Chaining" (?.) to prevent crashes if authorName is missing
  const displayName = props.author?.firstName 
    ? `${props.author.firstName} ${props.author.surname}` 
    : "Unknown Author";

  return (
    
    <div className="aPost">
      <div className="postHeader">
        {/* {props.post.authorId.userImage && (
        <img className="postImg" src={props.post.authorId.userImage} alt="Post content" style={{ width: "80px", height: "80px", borderRadius: "50%" }}/>
      )} */}
      <h3 className="authorName">{displayName}</h3>
      </div>
      
      <p className="postContent">{props.content}</p>
      
      <p className="datetime">
        <small>{timeSincePosted}</small>
      </p>
      <img
            src={props.author?.userImage}
            alt="avatar"
            style={{ width: "70px", height: "70px", borderRadius: "50%" }}
          />
    </div>
  );
};

export default PostInfo;