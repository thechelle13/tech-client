import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import steveImage from '../assets/steve.png';
import { getTechUser } from "../services/techUsers";



export const Home = ({token, setToken}) => {

const [techUser, setTechUser] = useState([]);

  const getAndSetTechUser = async () => {
    try {

      const techUserObj = await getTechUser();
     
      setTechUser(techUserObj);

    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

useEffect(() => {
    getAndSetTechUser()
  }, []);

  return (
    <main className="flex flex-col items-center h-screen bg-gray-100">
  <div className="text-center mb-8">
    <h1 className="text-4xl font-bold mb-4 text-blue-500">Welcome to TechPower</h1>

    <img className="app-logo mx-auto mb-4" src={steveImage} alt="Good job Steve" />

    <div>A platform designed to connect employers with tech talent efficiently.</div>
  </div>

  <div className="user-info-container text-center bg-gray-200 p-4 rounded-md" key={techUser.id}>
    <h2 className="text-2xl font-bold mb-2 text-blue-800">
      {`Welcome, ${techUser.first_name} ${techUser.last_name}`}
      {/* {`Welcome, ${user.tech_user.first_name} ${user.tech_user.last_name}`} */}
    </h2>
    {/* <div>{techUser.bio}</div> */}
{/*     
    <div>
      
    First Name: <input></input>
    Last Name: <input></input>
    Bio:<input></input>
    </div>


    <button>Edit</button>
    <button>Delete</button> */}
  </div>
</main>
    
  );
};