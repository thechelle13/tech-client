import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTechUser, getTechUser, editTechUser } from "../../services/techUsers";

export const EditUserForm = () => {
  const { techuserId } = useParams();
  const [techUser, setTechUser] = useState({
    user: {
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      bio: "",
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    getTechUser(techuserId).then((techuserObj) => {
      setTechUser(techuserObj); 
    });
  }, [techuserId]);
  

  const updateTech = (e) => {
    const copy = { ...techUser };
    copy.user[e.target.id] = e.target.value;
    setTechUser(copy);
  };

  const handleCancel = () => {
    navigate("/"); 
  };

  const handleSaveClick = () => {
    editTechUser(techuserId, techUser.user).then(() => {
        navigate(`/edit-user/${techuserId}`);

    });
  };
  

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Profile?"
    );
    if (confirmDelete) {
      deleteTechUser(techuserId).then(() => {
        navigate("/");
      });
    }
  };

  return (
    <main className="flex flex-col items-center h-screen bg-gray-100">
  <div className="text-center my-8">
    <h1 className="text-5xl font-semibold mb-4 text-blue-500">TechPower</h1>

    <div className="user-info-container bg-gray-300 p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-2 text-blue-800">
        Welcome, {techUser.user.first_name} {techUser.user.last_name}
      </h2>

      <fieldset className="mb-4">
        <label className="block font-bold mb-1" htmlFor="firstname">
          First Name:
        </label>
        <input
          id="firstname"
          type="text"
          className="border p-2 w-full"
          value={techUser.user.first_name}
          onChange={(e) => updateTech(e)}
        />
      </fieldset>

      <fieldset className="mb-4">
        <label className="block font-bold mb-1" htmlFor="last_name">
          Last Name:
        </label>
        <input
          id="last_name"
          type="text"
          className="border p-2 w-full"
          value={techUser.user.last_name}
          onChange={(e) => updateTech(e)}
        />
      </fieldset>

      <fieldset className="mb-4">
        <label className="block font-bold mb-1" htmlFor="email">
            Email:
        </label>
        <input
            id="email"
            className="border p-2 w-full"
            value={techUser.user.email}
            onChange={(e) => updateTech(e)}
            autoComplete="email"
        />
        </fieldset>


      <fieldset className="mb-4">
        <label className="block font-bold mb-1" htmlFor="bio">
          Bio:
        </label>
        <textarea
          id="bio"
          className="border p-2 w-full"
          value={techUser.bio}
          onChange={(e) => updateTech(e)}
        />
      </fieldset>

      <div className="flex justify-center space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => handleSaveClick()}
        >
          Save Changes
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
          onClick={() => handleCancel()}
        >
          Cancel
        </button>
      </div>
      
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
        onClick={() => handleDeleteClick()}
      >
        Delete Profile
      </button>
    </div>
  </div>
</main>

  );
};
