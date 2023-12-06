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

  // const handleEditClick = (post) => {

  // }
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
  }, [postToDelete]); // Fetch posts whenever postToDelete changes

  return (
    <>
      <div className="page-title">My Posts</div>
      <div className="content">
        {myPosts && myPosts.length ? (
          myPosts.map((post) => (
            <div className="card-item" key={post.id}>
              <div className="card-header">
                <div className="post-title">{post.title}</div>
                <div className="post-date">
                  Publication Date: {post.publication_date}
                </div>
              </div>
              <div className="card-body">
                <div className="post-title" src={post.title} alt={post.title} />
                <div>{post.content}</div>
              </div>

              
              <div className="card-footer">
                
             

                <h4 className="post-author">
                  Author: {post.tech_user.user.username}
                </h4>
                <h4 className="post-reactions">
                  Skill Count: {post.skills.length}
                </h4>

                <h4 className="post-reactions">
                  Area:
                   {/* {post.areas.length}
                   {post.area.label} */}
                </h4>
                {post?.is_owner ? (
                      <div className="manage-skills-div">
                        <button
                          onClick={() =>
                            navigate(`/postList/${post.id}/edit-post`)
                          }
                        >
                          Edit
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                <div className="comment-buttons">
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteClick(post)}
                  >
                    Delete Post
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </>
  );
};