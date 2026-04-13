//link to package: https://date-fns.org/

import { formatDistanceToNow} from "date-fns"
function ProfilePostCard({ post }) {
  const formattedDate = new Date(post.createdAt).toLocaleString("en-GB");
  const timeSincePosted = formatDistanceToNow(new Date(post.createdAt))

  return (
    <article className="post-card">
      <div className="post-card__content">
        <p>{post.postContent}</p>
      </div>

      {post.postImage && (
        <div className="post-card__image-container">
          <img
            className="post-card__image"
            src={post.postImage}
            alt="Post"
          />
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
