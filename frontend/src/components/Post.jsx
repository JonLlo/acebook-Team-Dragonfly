import { useState } from "react";
import LikeButton from "./LikeButton";
import PostInfo from "./PostInfo";
import Comment from "./Comment";
import { addCommentToPost, toggleLike } from "../services/posts";

// Post.jsx



const Post = (props) => {
  // const [youLike, setYouLike] = useState(props.youLike); //need to get this from backend!!
  // const [likesCount, setLikesCount] = useState(props.likes?.length || 0);
  const [youLike, setYouLike] = useState(props.likedByCurrentUser); //need to get this from backend!!
  const [likesCount, setLikesCount] = useState(props.likesCount);

  const [comments, setComments] = useState(props.comments || []);
  const [commentContent, setCommentContent] = useState("");
  const [error, setError] = useState("");


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

  // async function handleSubmitComment(event) {
  //   event.preventDefault();

  //   const token = localStorage.getItem("token");

  //   if (commentContent.trim() === "") {
  //     setError("Please enter a valid comment");
  //     //alert("Please enter a valid comment");
  //     return
  //   }

  //   try {
  //     //alert('Thanks for commenting!')
  //     await addCommentToPost(props._id, commentContent, token);
  //     setCommentContent(comments)
      
      
  //   } catch (err) {
  //     //alert('yoyo2')
  //     console.error(err);
  //     setError(["Signup failed. Please try again."]);
  //   }
  // }




    async function handleSubmitComment(event) {
    event.preventDefault();

    const token = localStorage.getItem("token");

    if (commentContent.trim() === "") {
      setError("Please enter a valid comment");
      //alert("Please enter a valid comment");
      return
    }

    try {
      //alert('Thanks for commenting!')
      const newCommentObject = await addCommentToPost(props._id, commentContent, token);
      const newComment = newCommentObject.comment

      console.log('new comment here', newComment)
      const normalized = {
        _id: newComment._id,
        commentContent: newComment.commentContent,
        createdAt: newComment.createdAt,
        updatedAt: newComment.updatedAt,
        author: {
          _id: newComment.authorId._id,
          firstName: newComment.authorId.firstName || "",
          surname: newComment.authorId.surname || "",
          userImage: newComment.authorId.userImage
        }
      };
      console.log('comments here', [...comments, newComment])
      console.log('comments update', [...comments, normalized])
      setComments([...comments, normalized])
      
      
    } catch (err) {
      //alert('yoyo2')
      console.error(err);
      setError(["Signup failed. Please try again."]);
    }
  }



  


    function handleCommentContentChange(event) {
      setCommentContent(event.target.value);
  }



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
      <form method="post" onSubmit={handleSubmitComment}>
          <input placeholder="Add Comment!!" value={commentContent} onChange={handleCommentContentChange} type="text" name="fname" />
          <input type="submit" value="Submit" />
        </form>
        



      <div className="comments-section">
        <Comment comments={comments} />
      </div>
  
    </div>
  );
};


export default Post;
