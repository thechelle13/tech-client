import { useEffect, useState } from "react";
import { getTechUser } from "../services/techUsers";
import { useNavigate } from "react-router-dom";
import Clock from "../components/utils/HumanClock";


export const Home = ({token, setToken}) => {
  
const [techUser, setTechUser] = useState({user: {}});

const [visitCount, setVisitCount] = useState(0);

let navigate = useNavigate();

const getAndSetTechUser = () => {
  getTechUser().then((techUser) => {
    setTechUser(techUser);
  });
};

useEffect(() => {
  getAndSetTechUser();
}, []); 

useEffect(() => {
  // Get the visit count from localStorage
  const storedCount = localStorage.getItem('visitCount');
  if (storedCount) {
    setVisitCount(parseInt(storedCount, 10));
  } else {
    setVisitCount(0);
  }

  // Increment the visit count
  setVisitCount((prevCount) => prevCount + 1);

  // Save the updated visit count to localStorage
  localStorage.setItem('visitCount', visitCount.toString());

  // Fetch and set tech user
  getAndSetTechUser();
}, []); 

  return (
    <main>
  <div className="text-center my-8 bg-gray-300 p-6 rounded-lg shadow-lg">
    <h1 className="text-5xl font-semibold mb-4 text-blue-500">Welcome to TechPower</h1>

    
    <div className="user-info-container bg-gray-300 p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-2 text-blue-800">
        {techUser.user.first_name} {techUser.user.last_name}
      </h2>

      <button className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => navigate(`/edit-user/${techUser.user.id}`)}
      >Edit Profile</button>
    </div>


    <p className="text-gray-700 mb-4">A platform designed to connect employers with tech talent efficiently.</p>
    
    <Clock />
  </div>
</main>

  );
}