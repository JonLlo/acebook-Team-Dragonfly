import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getPosts } from "../../services/posts";
import Post from "../../components/Post";
// import LogoutButton from "../../components/LogoutButton";
import "./FeedPage.css";
import Navbar from "../../components/Navbar";

export function FeedPage() {
  //   let hardcoded_post = {

  //   postContent: "this is a post",
  //   authorImage: "../public/images/defaultAvatar",
  //   comments: {"com_test": "com_test2"},
  //   likes: {"like_test": "like_test2"},
  // }
  //   let hardcoded_post_2 = {

  //   postContent: "this is a post",
  //   authorImage: "../public/images/defaultAvatar",
  //   comments: {"com_test": "com_test2"},
  //   likes: {"like_test": "like_test2"},
  // }

  const [posts, setPosts] = useState([]);
  //console.log(`HERE! POSTS:` +  posts)

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;
    if (loggedIn) {
      getPosts(token)
        .then((data) => {
          setPosts(data.posts);
          localStorage.setItem("token", data.token);
          console.log("TOKENTOKEN", data.token);
          console.log("POSTPOST", data.posts);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  }, [navigate]);

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  return (
    <>
      <Navbar />

      <div className="feed-content">
        <h2>My Feed</h2>

        <div className="feed" role="feed">
          {posts.map((post, index) => {
            console.log(post._id);
            //console.log("HERE POSTS 2:", posts);
            console.log("INDEX: " + index + " POST: " + post.postContent);
            console.log("LIKES " + post.likesCount);

            //fetch request fetching the count and the status of youLike. need to send the token and the
            // parameter: post_id
            // token : user_id in the header

            // Only render the Post component if there is actually content
            return post.postContent ? <Post {...post} key={index} /> : null;
          })}
        </div>
      </div>
      {/* <PostList /> */}
    </>
  );
}
