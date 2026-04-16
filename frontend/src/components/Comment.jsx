import "../css/comment.css";

const Comment = (props) => {
  return (
    <div className="comment-list">
      {props.comments && props.comments.length > 0 ? (
        props.comments.map((comment) => {
          return comment.commentContent ? (
            <div
              key={comment._id}
              className={`comment ${comment.isNew ? "comment-new" : ""}`}
            >
              <img
                src={comment.author?.userImage}
                alt="avatar"
                className="comment-avatar"
              />
              <p className="comment-text">
                <span className="comment-author">
                  {comment.author.firstName}
                </span>{" "}
                {comment.commentContent}
              </p>
            </div>
          ) : null;
        })
      ) : (
        <p className="no-comments">No comments yet.</p>
      )}
    </div>
  );
};

export default Comment;
