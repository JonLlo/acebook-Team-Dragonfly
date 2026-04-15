const CommentList = (props) => {
  return (
    <div>
      {props.comments && props.comments.length > 0 ? (
        props.comments.map((comment) => {
          return comment.commentContent ? (
            <div
              key={comment._id}
              className="comment"
              style={{ display: "flex", justifyContent: "center", gap: "10px" }}
            >
              <img
                src={comment.author?.userImage}
                alt="avatar"
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
              <p>
                {comment.author.firstName} {" - "}
                {comment.commentContent}
              </p>
            </div>
          ) : null;
        })
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};




export default CommentList;
