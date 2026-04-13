import ProfilePostCard from "./ProfilePostCard";

function ProfileUserPosts({ posts, onPostUpdated }) {
  if (!posts) {
    return <p>This user has not posted anything yet.</p>;
  }

  return (
    <section className="user-posts">
      <h2>Posts</h2>

      <div className="user-posts__list">
        {posts.map((post) => (
          <ProfilePostCard 
          key={post._id} 
          post={post}
          onPostUpdated={onPostUpdated}
          />
        ))}
      </div>
    </section>
  );
}

export default ProfileUserPosts;
