import "./PostInfo.css";

const PostInfo = (props) => {
  // We need to extract the string values from the object
  // We use "Optional Chaining" (?.) to prevent crashes if authorName is missing
  const displayName = props.author?.firstName 
    ? `${props.author.firstName} ${props.author.surname}` 
    : "Unknown Author";

  return (
    
    <div className="aPost">
      <div className="postHeader">
        {props.author.userImage && (
        <img className="postImg" src={props.author.userImage} alt="Post content" style={{ width: "80px", height: "80px", borderRadius: "50%" }}/>
      )}
      <h3 className="authorName">{displayName}</h3>
      </div>
      
      <p className="postContent">{props.content}</p>
      
      <p className="datetime">
        <small>{props.datetime}</small>
      </p>
    </div>
  );
};

export default PostInfo;