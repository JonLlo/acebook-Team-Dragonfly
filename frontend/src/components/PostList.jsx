import { useState } from "react";
import Post from "./Post";


const PostList = () => {
  const [posts, setPosts] = useState([
    {
      postId: "Test Post",
      authorId: "Test Author",
      postContent: "Test Content",
      image: "some image",
      commentsArray: "test Comments Array",
      likes: "test likes",
      time: "test time",
      postYouLiked: false,
    },
    {
      postId: "Test 2",
      authorId: "test 2",
      postContent: "test 2",
      image: "test image 2",
      commentsArray: "test comment 2",
      likes: "test likes",
      time: "test time",
      postYouLiked: false,
    },
  ]);

  const toggleMostRecent = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, MostRecent: !post.MostRecent } : post,
      ),
    );
  };

  const sortedPosts = [...posts].sort(
    (a, b) => Number(b.MostRecent) - Number(a.MostRecent),
  );

  return (
    <>
            
      {sortedPosts.map((post) => (
        <Post
          key={post.id}
          {...post}
          toggleMostRecent={() => toggleMostRecent(post.id)}
        />
      ))}
          
    </>
  );
};

export default PostList;
