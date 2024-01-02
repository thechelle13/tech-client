import { useEffect, useState } from "react";
import derekImage from '../assets/Derek.png';
import valImage from '../assets/val.png';
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
    <main className="flex flex-col items-center h-screen bg-gray-100">
  <div className="text-center my-8">
    <h1 className="text-5xl font-semibold mb-4 text-blue-500">Welcome to TechPower</h1>

    <p className="text-gray-700 mb-4">Number of people visited: {visitCount}</p>
    
    <div className="user-info-container bg-gray-300 p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-2 text-blue-800">
        {techUser.user.first_name} {techUser.user.last_name}
      </h2>

      <button className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => navigate(`/edit-user/${techUser.user.id}`)}
      >Edit Profile</button>
    </div>

    <div className="flex flex-wrap justify-center">
      <img className="app-logo mx-2 my-4" src={derekImage} alt="Good job Derek" />
      <img className="app-logo mx-2 my-4" src={valImage} alt="Good job Val" />
    </div>

    <p className="text-gray-700 mb-4">A platform designed to connect employers with tech talent efficiently.</p>
    
    <Clock />
  </div>
</main>

  );
}