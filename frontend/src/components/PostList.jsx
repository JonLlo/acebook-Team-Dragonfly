// import { useState} from "react";
// // import PostInfo from "./PostInfo";
// import Post from "./Post";


// // PostList.jsx
// // PostList.jsx
// const PostList = () => {
//   const [posts] = useState([
//     {
//       postId: "1",
//       authorId: "John Doe",
//       postContent: "Hello World!",
//       image: "",
//       datetime: new Date().toLocaleString(),
//     },
//     {
//       postId: "2",
//       authorId: "Jane Smith",
//       postContent: "React is awesome.",
//       image: "",
//       datetime: new Date().toLocaleString(),
//     }
//   ]);

//   return (
//     <div className="feed">
//       <h2>Posts</h2>
//       {posts.map((post) => (
//         <Post key={post.postId} {...post} /> 
//         /* The ...post "spreads" everything so Post.jsx gets postContent, authorId, etc. */
//       ))}
//     </div>
//   );
// };

// const PostList = () => {

//   //const posts = getfromdatabase(posts)

//   const [posts, setPosts] = useState([
//     {
//       postId: "Test Post",
//       authorId: "Test Authhhor",
//       postContent: "C Test Content",
//       image: "some image",
//       commentsArray: "test Comments Array",
//       likes: "test likes",
//       datetime: Date(8.64e15).toString(),
//       postYouLiked: false,
//     },
//     {
//       postId: "Test 2",
//       authorId: "test 2",
//       postContent: "B test 2",
//       image: "test image 2",
//       commentsArray: "test comment 2",
//       likes: "test likes",
//       datetime: Date(8.64e15).toString(),
//       postYouLiked: true,
//     }
//   ]);

//   const toggleMostRecent = (datetime) => {
//     setPosts(
//       posts.map((post) =>
//         post.time=== datetime ? { ...post, MostRecent: !post.MostRecent } : post,
//       ),
//     );
//   };

//   const sortedPosts = [...posts].sort(
//     (a, b) => Number(b.MostRecent) - Number(a.MostRecent),
//   );

//   return (
//     <>
//       {sortedPosts.map((post) => (
//         <PostInfo
//           key={post.id}
//           {...post}
//           toggleMostRecent={() => toggleMostRecent(post.id)}
//         />
//       ))}
//     </>
//   );
// };

// export default PostList;
