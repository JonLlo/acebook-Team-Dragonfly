import ProfilePostCard from "./ProfilePostCard";

function ProfileUserPosts({ posts, onPostUpdated, onPostDeleted }) {
  if (!posts || posts.length == 0) {
    return (
      <section>
            
            <p className="user-posts__empty">This user has not posted anything yet.</p>

      </section>
      
    );
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
            onPostDeleted={onPostDeleted}
          />
        ))}
      </div>
    </section>
  );
}

export default ProfileUserPosts;
