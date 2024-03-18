import { useEffect, useState } from "react";
import { getTechUser } from "../services/techUsers";
import { getAllPosts, deletePost } from "../services/postServices";
import { Link, useNavigate } from "react-router-dom";
import Clock from "../components/utils/HumanClock";

export const Home = ({ token, setToken }) => {
  const [techUser, setTechUser] = useState({ user: {} });
  const [visitCount, setVisitCount] = useState(0);
  const [myPosts, setMyPosts] = useState([]);
  const [postToDelete, setPostToDelete] = useState(null);
  const navigate = useNavigate();

  const getAndSetTechUser = () => {
    getTechUser().then((techUser) => {
      setTechUser(techUser);
    });
  };

  const getAndSetMyPosts = async () => {
    try {
      const postsArray = await getAllPosts();
      const filteredArray = postsArray.filter((post) => post.is_owner === true);
      const sortedArray = filteredArray.sort(
        (a, b) => new Date(b.publication_date) - new Date(a.publication_date)
      );
      setMyPosts(sortedArray);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDeleteClick = (post) => {
    setPostToDelete(post);
  };

  useEffect(() => {
    // Get the visit count from localStorage
    const storedCount = localStorage.getItem("visitCount");
    if (storedCount) {
      setVisitCount(parseInt(storedCount, 10));
    } else {
      setVisitCount(0);
    }

    // Increment the visit count
    setVisitCount((prevCount) => prevCount + 1);

    // Save the updated visit count to localStorage
    localStorage.setItem("visitCount", visitCount.toString());

    // Fetch and set tech user
    getAndSetTechUser();
    getAndSetMyPosts();
  }, []); // Run once on component mount

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

  return (
    <main>
      <div className="text-center my-8 bg-gray-300 p-6 rounded-lg shadow-lg">
        <h1 className="text-5xl font-semibold mb-4 text-blue-500">
          Welcome to TechPower
        </h1>

        <div className="user-info-container bg-gray-400 p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-blue-800">
            {techUser.user.first_name} {techUser.user.last_name}
          </h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => navigate(`/edit-user/${techUser.user.id}`)}
          >
            Edit Profile
          </button>
        </div>

        <p className="text-gray-700 mb-4">
          A platform designed to connect employers with tech talent efficiently.
        </p>

        <Clock />

        <div className="container mx-auto mt-8">
          <h1 className="text-3xl text-blue-500 font-semibold mb-4 text-center">
            My Posts
          </h1>

          <div>
            {myPosts && myPosts.length ? (
              myPosts.map((post) => (
                <Link key={post.id} to={`/postLists/${post.id}`}> {/* Corrected the syntax error here */}
                  <div className="bg-gray-100 rounded-md p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-xl font-semibold">
                        Title: {post.title}
                      </div>
                      {/* <div className="text-xl font-semibold">
                        Affliate: {post.affliate}
                      </div> */}
                      <div className="text-gray-500">
                        Publication Date: {post.publication_date}
                      </div>
                    </div>
                    <div className="card-body">
                      {/* <img
                        className="post-image"
                        src={post.image_url}
                        alt="example"
                        width="400px"
                      /> */}
                      {/* <div className="mb-4">{post.content}</div> */}
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
                            onClick={() =>
                              navigate(`/postList/${post.id}/edit-post`)
                            }
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
                </Link>
              ))
            ) : (
              <p className="text-xl font-semibold mb-4 text-center">
                No posts found.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};