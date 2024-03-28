import { useEffect, useState } from "react";
import { getTechUser } from "../services/techUsers";
import { getAllPosts } from "../services/postServices";
import { Link, useNavigate } from "react-router-dom";
import Clock from "../components/utils/HumanClock";

export const Home = ({ token, setToken }) => {
  const [techUser, setTechUser] = useState({ user: {} });
  const [myPosts, setMyPosts] = useState([]);

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

  useEffect(() => {
        
    // Fetch and set tech user
    getAndSetTechUser();
    getAndSetMyPosts();
  }, []); 


  return (
    <main>
      <div className="text-center my-8 bg-gray-400 p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h1 className="text-5xl font-semibold mb-4 text-blue-500">
          Welcome to TechPower
        </h1>

        <div className="user-info-container bg-gray-500 p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-blue-800">
            {techUser.user.first_name} {techUser.user.last_name}
          </h2>
          <p className="text-blue-800 mb-2">{techUser.user.email}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
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
                <Link key={post.id} to={`/postLists/${post.id}`}> 
                  <div className="bg-gray-100 rounded-md p-4 mb-4">
                   
                      <div className="text-xl font-semibold">
                        Title: {post.title}
                      </div>
                     
                      <div className="text-gray-500">
                        Publication Date: {post.publication_date}
                      </div>
                
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