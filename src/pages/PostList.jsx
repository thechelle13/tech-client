import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllPosts } from "../services/postServices";




export const PostList = ({ setToken, token }) => {
  const [posts, setPosts] = useState([]);
  const [mostWantedSkill, setMostWantedSkill] = useState("");
  const [mostWantedArea, setMostWantedArea] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const getAndSetPosts = () => {
    getAllPosts().then((postsArray) => {
      const currentDate = new Date();
      const filteredPosts = postsArray.filter(
        (post) => new Date(post.publication_date) < new Date()
      );

      const sortedPosts = filteredPosts.sort(
        (a, b) => new Date(b.publication_date) - new Date(a.publication_date)
      );

      // Update most wanted skill
      let skillsCount = {};
      sortedPosts.forEach((post) => {
        if (post.skills) {
          post.skills.forEach((skill) => {
            skillsCount[skill.label] = (skillsCount[skill.label] || 0) + 1;
          });
        }
      });
      const mostWantedSkill =
        Object.keys(skillsCount).length > 0
          ? Object.keys(skillsCount).reduce((a, b) =>
              skillsCount[a] > skillsCount[b] ? a : b
            )
          : "";
      setMostWantedSkill(mostWantedSkill);

      // Update most wanted area
      let areasCount = {};
      sortedPosts.forEach((post) => {
        if (post.areas) {
          post.areas.forEach((area) => {
            areasCount[area.label] = (areasCount[area.label] || 0) + 1;
          });
        }
      });
      const mostWantedArea =
        Object.keys(areasCount).length > 0
          ? Object.keys(areasCount).reduce((a, b) =>
              areasCount[a] > areasCount[b] ? a : b
            )
          : "";
      setMostWantedArea(mostWantedArea);

      setPosts(sortedPosts);
    });
  };

  useEffect(() => {
    getAndSetPosts();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter posts based on search query
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="container mx-auto mt-8">
        <div className="text-3xl font-semibold mb-4 text-center">All Posts</div>

        <div className="flex justify-between items-center mb-4">
          <div className="relative bg-beige-200 rounded-lg shadow-lg p-6 text-center">
            <div className="text-xl font-bold text-blue-500">Today's</div>
            <div className="text-xl font-bold text-blue-500">Most</div>
            <div className="text-xl font-bold text-red-500">WANTED</div>
            <div className="text-lg font-bold  mb-4 text-blue-500">SKILL :</div>
            <div className="text-xl font-bold mb-4 text-red-500">{mostWantedSkill}</div>
          </div>

          {/* <div className="relative bg-beige-200 rounded-lg shadow-lg p-6 text-center">
            <div className="text-xl font-bold text-blue-500">Today's</div>
            <div className="text-xl font-bold text-blue-500">Most</div>
            <div className="text-xl font-bold text-red-500">WANTED</div>
            <div className="text-lg font-bold  mb-4 text-blue-500">Area :</div>
            <div className="text-xl font-bold mb-4 text-red-500">{mostWantedArea}</div>
          </div> */}
        </div>

        <div className="flex items-center justify-center h-full">
          
  <div className="input-field flex items-center border p-2">
    <input
      type="text"
      placeholder="Search by title..."
      value={searchQuery}
      onChange={handleSearchChange}
      autoComplete="off"
      className="mx-auto" 
      id="searchInput"
    />
  </div>
</div>


        <div className="flex items-center justify-center">
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md mx-auto mb-4" onClick={() => navigate("/create-post")}>
        NEW POST
      </button>
      </div>

        <div>
          {filteredPosts && filteredPosts.length ? (
            filteredPosts.map((post) => (
              <div className="bg-gray-100 rounded-md p-4 mb-4" key={post.id}>
                <Link to={`/postLists/${post.id}`}>
                  <div className="post-details">
                    <div className="post-header">
                      <div className="post-title">Title: {post.title}</div>
                      <div className="post-date">Date: {post.publication_date}</div>
                      <div className="post-author">
                        Author: {post.tech_user.user.username}
                      </div>
                      <div className="post-author">Affliate: {post.affliate}</div>
                    </div>

                    <div className="post-footer">
                      <div className="post-skill-container">
                        <div>Skills: </div>
                        <div className="skill-div">
                          {post.skills &&
                            post.skills.map((skill) => (
                              <div
                                className="skill-label bg-blue-500 text-white"
                                key={skill.id}
                              >
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
                      <div className="skill-label bg-blue-800 text-white">
                        {post.area && post.area.label}
                      </div>
                    </div>
                  </div>
                </Link>

                {post?.is_owner ? (
                  <div className="manage-skills-div">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
                      onClick={() => navigate(`/postList/${post.id}/edit-post`)}
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
      </div>
    </>
  );
};