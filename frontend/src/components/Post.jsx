// function Post(props) {
//   return <article key={props.post._id}>{props.post.message}</article>;
// }

const Post = (props) => {
  return (
    <div className="aPost">
      <p className="postId">{props.id}</p>
      <p className="authorId">{props.authorId}</p>
      <p className="authorName">{props.authorName}</p>
      <p className="postContent">{props.content}</p>
      <img className = "postImg" src = {props.img}/>
      <p className="comments">{props.comments}</p>
      <button onClick=likes>Like!</button>  
      <p className="time">{props.time}</p>


    </div>
  )
}


export default Post;


const PostList = (props) => {
    return (
    <div className={`gig ${props.isFavourite ? "favourited" : ""}`}>
      <h3 className="postId">{props.bandname}</h3>
      <p className="authorId">{props.desc}</p>
      <p className="Content">When? <br /><b>{props.date}</b></p>
      <p className="Image">Where? <br /><b>{props.location}</b></p>

      {/* Instead of local state, it uses props from the parent */}
      <button onClick={props.onToggle}>
        {props.isFavourite ? "❤️ Favourited" : "🤍 Favourite?"}
      </button>
      <p>
      <img src={props.image} alt={props.bandname}/>
      </p>
        
    </div>
  );
};

export default Gig;
    )
}