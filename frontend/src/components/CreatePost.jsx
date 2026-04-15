import { useState, useEffect } from "react";
import "./CreatePost.css";
import { useNavigate } from "react-router-dom"


const CreatePost = (props) => {
    const [postContent, setPostContent] = useState("");
    const [postImage, setPostImage] = useState("");
    const [posts, setPosts] = useState(props.posts || []);
    const navigate = useNavigate()

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((response) => response.json())
      .then((posts) => setPosts(posts))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    console.log("TOKEN---->", token)

        const postInfo = {
            postContent: postContent, 
            postImage: postImage || "",
        };
        fetch("http://localhost:3000/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/JSON",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(postInfo),
        })
            .then((res) => {
              console.log("RES1--->", res.json())
                if (res.status === 401 || res.status === 403) {
                    console.log("RES2--->", res.json())
                    throw new Error("your session expired. Please log in again.")
                }
                console.log("RES3--->", res.json())
                return res.json();
            })
            .then((newPost) => { 
              console.log("NEWPOST--->", newPost)
                setPostContent("");
                setPostImage("");

                const postToAdd = newPost.post || newPost;

                props.onPostCreated(postToAdd);
                // const updatedPosts = [...posts, newPost]
                console.log("here are posts", posts)
                console.log("here is new post", newPost)
                console.log("FEATHER ", props.posts)
                // console.log("updated post here", updatedPosts)
                // setPosts(updatedPosts)
                navigate("/posts")
            })
            .catch((error) => {
                console.log("Post failed error:", error);
            });
    };
    
  return (
    <div className="createPost">
      <div className="submitForm">
        <form onSubmit={handleSubmit}>
          <div className="text-area-container">
            <textarea
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
    </div>
  );
};

export default CreatePost;
