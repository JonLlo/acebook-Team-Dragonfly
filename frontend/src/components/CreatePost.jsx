import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "./CreatePost.css";




const CreatePost = () => {
    const [postContent, setPostContent] = useState("");
    const [postImage, setPostImage] = useState("");
    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/posts")
            .then((response) => response.json())
            .then((posts) => setPosts(posts))
            .catch((error) => {
                console.log(error);
            })
    }, []);
    const handleSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");

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
                if (res.status === 401 || res.status === 403) {
                    throw new Error("your session expired. Please log in again.")
                }
                return res.json();
            })
            .then((newPost) => {
                setPostContent("");
                setPostImage("");

                navigate("/posts");
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
                            rows="2" />
                    </div>
                    <div className="submit-button">
                        <button type="submit" className="addPost">Post!</button>    
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;