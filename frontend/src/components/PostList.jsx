import { useState} from "react";
import PostInfo from "./PostInfo";


const PostList = () => {

  //const posts = getfromdatabase(posts)

  const [posts, setPosts] = useState([
    {
      postId: "Test Post",
      authorId: "Test Authhhor",
      postContent: "C Test Content",
      image: "some image",
      commentsArray: "test Comments Array",
      likes: "test likes",
      datetime: Date(8.64e15).toString(),
      postYouLiked: false,
    },
    {
      postId: "Test 2",
      authorId: "test 2",
      postContent: "B test 2",
      image: "test image 2",
      commentsArray: "test comment 2",
      likes: "test likes",
      datetime: Date(8.64e15).toString(),
      postYouLiked: true,
    }
  ]);

  const toggleMostRecent = (datetime) => {
    setPosts(
      posts.map((post) =>
        post.time=== datetime ? { ...post, MostRecent: !post.MostRecent } : post,
      ),
    );
  };

  const sortedPosts = [...posts].sort(
    (a, b) => Number(b.MostRecent) - Number(a.MostRecent),
  );

  return (
    <>
            
      {sortedPosts.map((post) => (
        <PostInfo
          key={post.id}
          {...post}
          toggleMostRecent={() => toggleMostRecent(post.id)}
        />
      ))}
            
    </>
  );
};

export default PostList;
