// function Post(props) {
//   return <article key={props.post._id}>{props.post.message}</article>;
// }

// // PostInfo.jsx
// const PostInfo = (props) => {
//   return (
//     <div className="aPost">
//       <h3 className="authorName">{props.authorName}</h3>
//       <p className="postContent">{props.content}</p>
//       {props.img && (
//         <img className="postImg" src={props.img} alt="Post content" />
//       )}
//       <p className="datetime">
//         <small>{props.datetime}</small>
//       </p>
//     </div>
//   );
// };

// export default PostInfo;


const PostInfo = (props) => {
  // We need to extract the string values from the object
  // We use "Optional Chaining" (?.) to prevent crashes if authorName is missing
  const displayName = props.authorName?.firstName 
    ? `${props.authorName.firstName} ${props.authorName.surname}` 
    : "Unknown Author";

  return (
    <div className="aPost">
      {/* Before: {props.authorName} - This caused the crash */}
      <h3 className="authorName">{displayName}</h3>
      
      <p className="postContent">{props.content}</p>
      
      {props.img && (
        <img className="postImg" src={props.img} alt="Post content" />
      )}
      
      <p className="datetime">
        <small>{props.datetime}</small>
      </p>
    </div>
  );
};

export default PostInfo;