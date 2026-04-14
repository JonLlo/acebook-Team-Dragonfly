const Comment = (props) => {
  return (
    <div>
      {props.comments && props.comments.length > 0 ? (
        props.comments.map((comment) => (
          <div key={comment._id} className="comment">
            <p>{comment.commentContent}</p>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default Comment;
