import { useState } from "react";
import "./CreatePost.css";

const CreatePost = (props) => {
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState("");
  const [error, setError] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    const postInfo = {
      postContent: postContent,
      postImage: postImage || "",
    };

    if (postContent.trim() === "") {
      setError("Please enter a valid post");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postInfo),
      });

      const data = await res.json(); // READ ONCE

      if (!res.ok) {
        throw new Error(data.error || "Failed to create post");
      }

      const newPost = data.post || data;

      const normalizedPost = {
        ...newPost,
        author: newPost.authorId,   // 
};

      // Tell FeedPage to update immediately
      props.onPostCreated(normalizedPost);

      // Clear form
      setPostContent("");
      setPostImage("");
      setError("");

    } catch (error) {
      console.log("Post failed error:", error);
    }
  };

  return (
    <div className="createPost">
      <div className="submitForm">
        <form onSubmit={handleSubmit}>
          <div className="text-area-container">
            <input
              className="post-content"
              placeholder="What's on your mind?"
              value={postContent}
              onChange={(event) => setPostContent(event.target.value)}
              rows="2"
            />
            
          </div>
          <div className="submit-button">
            <button type="submit" className="addPost">
              Post!
            </button>
          </div>
        </form>
      </div>
      <div>{error && <p className="post-error">{error}</p>}</div>
    </div>
  );
};

export default CreatePost;
