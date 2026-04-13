// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

//Getting from the backend:
export async function getPosts(token) {
  console.log("token" + token);
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/posts`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch posts");
  }

  const data = await response.json();
  // console.log("Status:", response.status);

  // console.log(data)
  //console.log('HERE ARE THE POSTS' + data.posts)
  return data;
}


//sending TO the backend from the front end
export async function toggleLike(postId, token) {
  console.log("POST ID HERE: " + postId)
  console.log("TOKEN", token)
  const requestOptions = {
    method: "PATCH",
    headers: {
     "Content-Type": "application/json",
     "Authorization": `Bearer ${token}`,
    },

  };
  const response = await fetch(`${BACKEND_URL}/posts/${postId}/likes`, requestOptions)
  

  if (!response.ok) {
    throw new Error("Unable to toggle like");
  }

  return response.json(); // contains likedByCurrentUser + likesCount
}


//comments

export async function addCommentToPost(postId, commentContent, token) {
  console.log('COMMENT HERE', commentContent)
  console.log("POST ID HERE: " + postId)
  console.log("TOKEN", token)
  console.log(commentContent)
  //Now we need to add the comment to the database.
  const requestOptions = {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
     "Authorization": `Bearer ${token}`,
    },

  };
  const response = await fetch(`${BACKEND_URL}/posts/${postId}/comments`, requestOptions)


  if (!response.ok) {
    throw new Error("Unable to add comment");
  }

  return response.json();

}

