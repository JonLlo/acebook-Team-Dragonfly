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
      
      {/* HEADER: Image and Name grouped together */}
      <div className="postHeader">
        <img
          className="userAvatar"
          src={props.author?.userImage}
          alt={`${displayName}'s avatar`}
        />
        <h3 className="authorName">{displayName}</h3>
      </div>
      
      {/* BODY: Post Content */}
      <p className="postContent">{props.content}</p>
      
      {/* FOOTER: Date */}
      <p className="datetime">
        <small>{timeSincePosted}</small>
      </p>
      
    </div>
  );
};

export default PostInfo;