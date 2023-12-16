import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTechUser, getTechUser, editTechUser } from "../../services/techUsers";
import "./forms.css";

export const EditUserForm = () => {
  const { techuserId } = useParams();
  const { userId } = useParams();

//   const userId = parseInt(techuserId, 10);

  const [techUser, setTechUser] = useState({
    user: {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
    },
  });

//   console.log("techuserId:", techuserId);



  const navigate = useNavigate();

  useEffect(() => {
    getTechUser(techuserId).then((techuserObj) => {
      setTechUser(techuserObj);
    });
  }, [techuserId, userId]);
  

  const updateTech = (e) => {
    const copy = { ...techUser };
    copy.user[e.target.id] = e.target.value;
    setTechUser(copy);
  };


  const handleCancel = () => {
    navigate("/"); 
  };

  const handleSaveClick = () => {
    // e.preventDefault()

    const updatedTechUser = {
        
        // id: techUser.user.id,
        first_name: techUser.user.first_name,
        last_name: techUser.user.last_name,
        email: techUser.user.email,
        username: techUser.user.username,
      
    };
     console.log("techuserId:", techuserId);
    console.log("userId:", userId);
    console.log("updatedTechUser:", updatedTechUser);



    editTechUser(parseInt(techuserId), updatedTechUser).then(() => {
      navigate(`/`);
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

    <fieldset className="user-info-container bg-gray-300 p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-2 text-blue-800">
         {techUser.user.first_name} {techUser.user.last_name}
      </h2>

      <div className="form-field">
        <label className="block font-bold mb-1" htmlFor="first_name">
          First Name:
        </label>
        <textarea
                className="textarea-field border p-2 w-full"
                id="first_name"
                onChange={(e) => updateTech(e)}
                type="text"
                placeholder=""
                value={techUser.user.first_name}
              />
      </div>

      <div className="form-field">
        <label className="block font-bold mb-1" htmlFor="last_name">
          Last Name:
        </label>
        <input
                className="input-field border p-2 w-full"
                id="last_name"
                onChange={(e) => updateTech(e)}
                type="text"
                placeholder=""
                value={techUser.user.last_name}
              />
      </div>

      <div className="form-field">
        <label className="block font-bold mb-1" htmlFor="email">
            Email:
        </label>
        <input
                className="input-field border p-2 w-full"
                id="email"
                onChange={(e) => updateTech(e)}
                type="email"
                placeholder=""
                value={techUser.user.email}
              />
        </div>

       
      {/* <div className="form-field">
        <label className="block font-bold mb-1" htmlFor="username">
          Username:
        </label>
        <textarea
                className="textarea-field border p-2 w-full"
                id="username"
                onChange={(e) => updateTech(e)}
                placeholder=""
                value={techUser.user.username}
              />
      </div> */}

      <div className="flex justify-center space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleSaveClick}
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
    </fieldset>
  </div>
</main>

  );
};