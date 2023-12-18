import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { deleteTechUser, getTechUser } from "../../services/techUsers";


export const EditUserForm = ({token, setToken}) => {
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

// const handleClearClick = () => {
//   setEditedUser({
//     first_name: '',
//     last_name: '',
//     bio: '',
//   });
// };

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
    <h1 className="text-7xl font-bold mb-4 text-blue-500">TechPower</h1>

    <div className="user-info-container text-center bg-gray-200 p-4 rounded-md">
      <h2 className="text-2xl font-bold mb-2 text-blue-800">
        <div className="pb-card-user" key={techUser.user.id}>
         {'Welcome,'} {techUser.user.first_name} {techUser.user.last_name}
        </div>
      </h2>

      <fieldset className="mb-4">
        <label className="block font-bold mb-1" htmlFor="firstName">
          First Name:
        </label>
        <input
          id="firstName"
          type="text"
          className="border p-2 w-full"
          value={editedUser.first_name }
          onChange={(e) => handleInputChange('first_name', e.target.value)}
        />
      </fieldset>

      <fieldset className="mb-4">
        <label className="block font-bold mb-1" htmlFor="lastName">
          Last Name:
        </label>
        <input
          id="lastName"
          type="text"
          className="border p-2 w-full"
          value={editedUser.last_name }
          onChange={(e) => handleInputChange('last_name', e.target.value)}
        />
      </fieldset>

      <fieldset className="mb-4">
        <label className="block font-bold mb-1" htmlFor="bio">
          Bio:
        </label>
        <textarea
          id="bio"
          className="border p-2 w-full"
          value={editedUser.bio }
          onChange={(e) => handleInputChange('bio', e.target.value)}
        />
      </fieldset>

      <div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mx-auto mb-4"
          onClick={() => handleSaveClick()}
        >
          Edit
        </button>
        {/* <button
          className="bg-gray-500 text-white px-4 py-2 rounded-md mx-auto mb-4"
          onClick={handleClearClick}
        >
          Clear
        </button> */}
      </div>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md"
        onClick={() => handleDeleteClick()}
      >
        Delete Profile?
      </button>
    </div>
  

  </div>
    </main>
  );
}