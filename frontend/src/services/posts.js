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
  console.log("POST ID HERE: " + postId);
  console.log("TOKEN", token);
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(
    `${BACKEND_URL}/posts/${postId}/likes`,
    requestOptions,
  );

  if (!response.ok) {
    throw new Error("Unable to toggle like");
  }

  return response.json(); // contains likedByCurrentUser + likesCount
}

//comments

// export async function addCommentToPost(postId, commentContent, token) {
//   console.log('COMMENT HERE', commentContent)
//   console.log("POST ID HERE: " + postId)
//   console.log("TOKEN", token)
//   console.log(commentContent)
//   //Now we need to add the comment to the database.
//   const requestOptions = {
//     method: "POST",
//     headers: {
//      "Content-Type": "application/json",
//      "Authorization": `Bearer ${token}`,
//     },

//   };
//   const response = await fetch(`${BACKEND_URL}/posts/${postId}/comments`, requestOptions)

//   if (!response.ok) {
//     throw new Error("Unable to add comment");
//   }

//   return response.json();

// }

export async function addCommentToPost(postId, commentContent, token) {
  console.log("COMMENT HERE_------>", commentContent);
  console.log("POST ID HERE:-------> " + postId);
  console.log("TOKEN", token);
  console.log(commentContent);
  //Now we need to add the comment to the database.

  const response = await fetch(`${BACKEND_URL}/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ commentContent: commentContent }),
  });

  if (!response.ok) {
    throw new Error("Unable to add comment");
  }

  const data = await response.json();

  return data;
}

//updating post comment and returning updated post
export async function editPostContent(postId, postUpdates) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BACKEND_URL}/posts/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postUpdates),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update users post");
  }
  return data;
}
