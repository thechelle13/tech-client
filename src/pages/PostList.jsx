import { useEffect, useState } from "react";
import { getAllPosts } from "../services/postServices";
import { Link, useNavigate } from "react-router-dom";

export const PostList = (
  { setToken, token }
  ) => {
  const [posts, setPosts] = useState({});
  const navigate = useNavigate();

  const getAndSetPosts = () => {
    getAllPosts().then((postsArray) => {
      const filteredPosts = postsArray.filter(
        (post) => new Date(post.publication_date) < new Date()
      );

      const sortedPosts = filteredPosts.sort(
        (a, b) => new Date(b.publication_date) - new Date(a.publication_date)
      );

      setPosts(sortedPosts);
    });
  };

  useEffect(() => {
    getAndSetPosts();
  }, []);

  return (
    <>
      <div className="text-3xl font-semibold mb-4 text-center">All Posts</div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md mx-auto mb-4" onClick={() => navigate("/create-post")}>
        NEW POST
      </button>
      <div>
        {posts && posts.length ? (
          posts.map((post) => (
            <div className="bg-gray-100 rounded-md p-4 mb-4" key={post.id}>
              <Link to={`/postLists/${post.id}`}>
                <div className="post-details">
                    <div className="post-header">
                        <div className="post-title">Title: {post.title}</div>
                          <div className="post-date">
                          Date: {post.publication_date}
                          </div>
                    <div className="post-author">
                      Author: {post.tech_user.user.username}
                    </div>
                  </div>
                  
                  <div className="post-footer">
                    <div className="post-skill-container">
                      <div>Skills: </div>
                      <div className="skill-div">
                        {post.skills.map((skill) => (
                          <div className="skill-label" key={skill.id}>
                            {skill.label}
                          </div>
                        ))}
                      </div>
                    </div>

                    

                  </div>

                  
                </div>

                <div className="post-footer">
                    <div className="post-skill-container">
                      <div>Area: </div>
                      <div className="skill-div">
                        {post.area.label}
                      </div>
                    </div>
                    </div>
              </Link>
                    {post?.is_owner ? (
                      <div className="manage-skills-div">
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
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
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </>
  );
};