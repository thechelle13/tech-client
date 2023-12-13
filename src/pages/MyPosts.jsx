import { useEffect, useState } from "react";
import "./pages.css";
import { getAllPosts, deletePost } from "../services/postServices";
import { useNavigate } from "react-router-dom";

export const MyPosts = ({ setToken, token }) => {
  const [myPosts, setMyPosts] = useState([]);
  const [postToDelete, setPostToDelete] = useState(null);
  const navigate = useNavigate();

  const getAndSetMyPosts = async () => {
    
    try {
      const postsArray = await getAllPosts();
      const filteredArray = postsArray.filter((post) => post.is_owner === true);
      const sortedArray = filteredArray.sort((a, b) => {
        return new Date(b.publication_date) - new Date(a.publication_date);
      });
      setMyPosts(sortedArray);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDeleteClick = (post) => {
    setPostToDelete(post);
  };

  useEffect(() => {
    if (postToDelete) {
      const handleDeleteConfirmation = async () => {
        const confirmDelete = window.confirm(
          "Are you sure you want to delete this post?"
        );
        if (confirmDelete) {
          try {
            await deletePost(postToDelete.id);
            // Update the state immediately after successful deletion
            setMyPosts((prevPosts) =>
              prevPosts.filter((post) => post.id !== postToDelete.id)
            );
          } catch (error) {
            console.error("Error deleting post:", error);
          } finally {
            setPostToDelete(null);
          }
        }
      };

      handleDeleteConfirmation();
    }
  }, [postToDelete]);

  useEffect(() => {
    getAndSetMyPosts();
  }, [postToDelete]);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4 text-center">My Posts</h1>
{/* 
      <div className="input-field border p-2 mx-auto">
          <input
           
            type="text"
            placeholder="Search by description..."
            // value={searchQuery}
            // onChange={handleSearchChange}
            autoComplete="off"
          />
        </div> */}
        
      <div>
        {myPosts && myPosts.length ? (
          myPosts.map((post) => (
            <div className="bg-gray-100 rounded-md p-4 mb-4" key={post.id}>
              <div className="flex justify-between items-center mb-2">
                <div className="text-xl font-semibold">Title: {post.title}</div>
                <div className="text-xl font-semibold">Affliate: {post.affliate}</div>
                <div className="text-gray-500">
                  Publication Date: {post.publication_date}
                </div>
              </div>
              <div className="card-body">
                <img className="post-image" src={post.image_url} alt="example" width="400px" />
              <div className="mb-4">{post.content}</div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">
                    Author: {post.tech_user.user.username}
                  </div>
                  <div className="text-sm text-gray-500">
                    Skill Count: {post.skills.length} 
                  </div>
                  <div className="text-sm text-gray-500">
                    Area: {post.area.label} 
                  </div>
                 
                </div>
  
                {post.is_owner && (
                  <div className="manage-skills-div">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                      onClick={() => navigate(`/postList/${post.id}/edit-post`)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                      onClick={() => handleDeleteClick(post)}
                    >
                      Delete Post
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-xl font-semibold mb-4 text-center">No posts found.</p>
        )}
      </div>
    </div>
  );
  
};