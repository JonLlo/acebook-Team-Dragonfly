// function Post(props) {
//   return <article key={props.post._id}>{props.post.message}</article>;
// }



// PostInfo.jsx
const PostInfo = (props) => {
  return (
    <div className="aPost">
      <h3 className="authorName">{props.authorName}</h3>
      <p className="postContent">{props.content}</p>
      {props.img && <img className="postImg" src={props.img} alt="Post content" />}
      <p className="datetime"><small>{props.datetime}</small></p>
    </div>
  );
};

export default PostInfo;

// const PostInfo = (props) => {
//   return (
//     <div className="aPost">
//       <p className="postId">{props.id}</p>
//       <p className="authorId">{props.authorId}</p>
//       <p className="authorName">{props.authorName}</p>
//       <p className="postContent">{props.content}</p>
//       <img className = "postImg" src = {props.img}/>

//       <button onClick={props.youLike}>
// {props.youLike ? "❤️ Liked" : " HELLO Like"}

// </button>
//       <p className="comments">{props.comments}</p>
//       <p className="datetime">{props.datetime}</p>


//     </div>
//   )
// }





// const PostList = (props) => {
//     return (
//     <div className={`gig ${props.isFavourite ? "favourited" : ""}`}>
//       <h3 className="postId">{props.bandname}</h3>
//       <p className="authorId">{props.desc}</p>
//       <p className="Content">When? <br /><b>{props.date}</b></p>
//       <p className="Image">Where? <br /><b>{props.location}</b></p>

//       {/* Instead of local state, it uses props from the parent */}
//       <button onClick={props.onToggle}>
//         {props.isFavourite ? "❤️ Favourited" : "🤍 Favourite?"}
//       </button>
//       <p>
//       <img src={props.image} alt={props.bandname}/>
//       </p>
        
//     </div>
//   );
// };

// export default Gig;
//     )
// }