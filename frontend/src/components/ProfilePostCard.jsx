//link to package: https://date-fns.org/
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { editPostContent } from "../services/posts";
import { deletePost } from "../services/posts";

function ProfilePostCard({ post, onPostUpdated, onPostDeleted }) {
  // const formattedDate = new Date(post.createdAt).toLocaleString("en-GB");
  const timeSincePosted = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.postContent);
  const [error, setError] = useState("");

  const handleEditClick = () => {
    setEditedContent(post.postContent);
    setError("");
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedContent(post.postContent);
    setError("");
    setIsEditing(false);
  };

  const handleSave = async () => {
    
    try {
      setError("");
      const data = await editPostContent(post._id, {
        postContent: editedContent,
      });
      onPostUpdated(data.post);
      setIsEditing(false);
    } catch (error) {
      setError(error.message || "Failed to updte post content");
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Confirm to delete");
    if(!confirm){
      return
    }
    try{
        console.log("POst ID to delete---->>", post._id)
      const data = await deletePost(post._id);
      onPostDeleted(data.deletedPostId);


    }catch(error){
      setError(error.message || "Unable to delete post.")

    }
  }

  return (
    <article className="post-card">
      <div className="post-card__content">
        {isEditing ? (
          <>
            <textarea
              value={editedContent}
              onChange={(event) => setEditedContent(event.target.value)}
            />
            <div className="post-card__actions">
              <button type="button" onClick={handleSave}>
                {" "}
                Save
              </button>
              <button type="button" onClick={handleCancel}>
                {" "}
                Cancel
              </button>
             
            </div>
            {error && <p>{error}</p>}
          </>
        ) : (
          <>
            <p>{post.postContent}</p>
            <div>
              <button type="button" onClick={handleEditClick}>
                Edit
              </button>
                <button type="button" onClick={handleDelete}> Delete</button>
            </div>
            {error && <p>{error}</p>}
          </>
        )}
      </div>

      {post.postImage && (
        <div className="post-card__image-container">
          <img className="post-card__image" src={post.postImage} alt="Post" />
        </div>
      )}
      <div className="post-card__meta">
        <span>{timeSincePosted}</span>
      </div>

      <div className="post-card__stats">
        <span>Likes: {post.likesCount}</span>
        <span>Comments: {post.commentsCount}</span>
      </div>
    </article>
  );
}

export default ProfilePostCard;
