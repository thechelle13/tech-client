export const getAllPosts = () => {
  return fetch(`http://localhost:8000/posts`, {
    method: "GET",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const getPostById = (id) => {
  return fetch(`http://localhost:8000/posts/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const deletePost = (postId) => {
  return fetch(`http://localhost:8000/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  })
};

export const editPost = (updatedPost) => {
  return fetch(`http://localhost:8000/posts/${updatedPost.id}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPost),})
}

// export const editPost = (updatedPost) => {
//   const url = `http://localhost:8000/posts/${updatedPost.id}`;

//   const requestOptions = {
//     method: "PUT",
//     headers: {
//       Authorization: `Token ${localStorage.getItem("auth_token")}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(updatedPost),
//   };

//   return fetch(url, requestOptions)
//     .then((res) => res.json())
//     .catch((error) => {
//       console.error("Error editing post:", error);
//       throw error; // Rethrow the error to handle it further if needed
//     });
// };

