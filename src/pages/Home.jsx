import { useEffect, useState } from "react";
import steveImage from '../assets/steve.png';
import derekImage from '../assets/Derek.png';
import valImage from '../assets/val.png';
import { deleteTechUser, getTechUser } from "../services/techUsers";
import { useParams } from "react-router-dom";
import Clock from "../components/utils/HumanClock";


export const Home = ({token, setToken}) => {
const techuserId = useParams()
const [techUser, setTechUser] = useState({user: {}});
const [editedUser, setEditedUser] = useState({
  first_name: '',
  last_name: '',
  bio: '',
});

const getAndSetTechUser = () => {
  getTechUser().then((techUser) => {
    setTechUser(techUser);
  });
};

useEffect(() => {
  getAndSetTechUser();
}, []); 

const handleClearClick = () => {
  setEditedUser({
    first_name: '',
    last_name: '',
    bio: '',
  });
};

const handleDeleteClick = (techuserId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this Profile?"
  );
  if (confirmDelete) {

    deleteTechUser(techuserId).then(() => {
      getAndSetTechUser();

  //     const handleDeleteClick = async () => {
  //   const confirmDelete = window.confirm("Are you sure you want to delete this profile?");
  //   if (confirmDelete) {
  //     try {
  //       await deleteTechUser(techuserId);
  //       // Perform any additional cleanup or actions after successful deletion
  //       // For example, you might want to redirect the user or update the UI
  //       getAndSetTechUser();
  //     } catch (error) {
  //       console.error("Error deleting tech user:", error);
  //       // Handle the error, display a message, or perform any necessary actions
  //     }
  //   }
  // };
    });
  }
};

  return (
    <main className="flex flex-col items-center h-screen bg-gray-100">
  <div className="text-center mb-8">
    <h1 className="text-7xl font-bold mb-4 text-blue-500">Welcome to TechPower</h1>

    <div className="user-info-container text-center bg-gray-200 p-4 rounded-md">
      <h2 className="text-2xl font-bold mb-2 text-blue-800">
        <div className="pb-card-user" key={techUser.user.id}>
          {techUser.user.first_name} {techUser.user.last_name}
        </div>
      </h2>

     <button>Edit Profile?</button> 
     
    </div>
  

    <img className="app-logo mx-auto mb-4" src={derekImage} alt="Good job Derek" />
    {/* <img className="app-logo mx-auto mb-4" src={steveImage} alt="Good job Steve" /> */}
    <img className="app-logo mx-auto mb-4" src={valImage} alt="Good job Val" />

    <div>A platform designed to connect employers with tech talent efficiently.</div>
    <Clock />
  </div>
    </main>
  );
}