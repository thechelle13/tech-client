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
        (post) => new Date(post.publication_date) < currentDate
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
      const areasCount = {};
      sortedPosts.forEach((post) => {
        const areaLabel = post.area ? post.area.label : null;
        areasCount[areaLabel] = (areasCount[areaLabel] || 0) + 1;
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
  // Filter posts based on search query
  const filteredPosts = posts.filter((post) => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    const lowerCaseTitle = post.title.toLowerCase();
    const lowerCaseContent = post.content.toLowerCase(); // Assuming there's a content field

    // Check if the search query is present in the title, content, or other relevant fields
    return (
      lowerCaseTitle.includes(lowerCaseSearchQuery) ||
      lowerCaseContent.includes(lowerCaseSearchQuery) ||
      // Include other fields as needed
      // For example, you might want to include the author's username
      post.tech_user.user.username.toLowerCase().includes(lowerCaseSearchQuery)
    );
  });

  return (
    <>
      <div className="container mx-auto mt-8">
        <div className="text-3xl font-semibold mb-4 text-center">All Posts</div>

        <div className="flex justify-between items-center mb-4">
          <div className="relative bg-blue-200 rounded-lg shadow-lg p-6 text-center">
            <div className="text-xl font-bold text-white mb-4">Today's most</div>
            <div className="text-xl font-bold mb-4">WANTED</div>
            <div className="text-lg font-bold mb-4 text-white">SKILL :</div>
            <div className="text-xl font-bold mb-4">{mostWantedSkill}</div>
          </div>

          <div className="relative bg-red-200 rounded-lg shadow-lg p-6 text-center">
            <div className="text-xl font-bold text-white mb-4">Today's most</div>
            <div className="text-xl font-bold mb-4">WANTED</div>
            <div className="text-lg font-bold mb-4 text-white">Area :</div>
            <div className="text-xl font-bold mb-4">{mostWantedArea}</div>
          </div>
        </div>

        <div className="flex items-center justify-center h-full">
          <div className="input-field flex items-center border p-2">
            <input
              type="text"
              placeholder="Search ..."
              value={searchQuery}
              onChange={handleSearchChange}
              autoComplete="off"
              className="w-full p-2 mx-auto" 
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
                      <div className="post-author">Affiliate: {post.affliate}</div>
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

                    <div className="post-footer">
                      <div className="post-skill-container">
                        <div>Area: </div>
                        <div className="skill-label bg-blue-800 text-white">
                          {post.area && post.area.label}
                        </div>
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