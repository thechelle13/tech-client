import { useEffect, useState } from "react";
import steveImage from '../assets/steve.png';
import { deleteTechUser, getTechUser } from "../services/techUsers";
import { useParams } from "react-router-dom";


export const Home = ({token, setToken}) => {
const techuserId = useParams()
const [techUser, setTechUser] = useState({user: {}});

const getAndSetTechUser = () => {
  getTechUser().then((techUser) => {
    setTechUser(techUser);
  });
};

useEffect(() => {
  getAndSetTechUser();
}, []); 

const handleDeleteClick = (techuserId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this Profile?"
  );
  if (confirmDelete) {
    deleteTechUser(techuserId).then(() => {
      getAndSetTechUser();

      // navigate to login in or register?

      // if (confirmDelete) {
      //   try {
      //     await deletePost(postToDelete.id);
      //     // Update the state immediately after successful deletion
      //     setMyPosts((prevPosts) =>
      //       prevPosts.filter((post) => post.id !== postToDelete.id)
      //     );
      //   } catch (error) {
      //     console.error("Error deleting post:", error);
      //   } finally {
      //     setPostToDelete(null);
      //   }
      // }
    });
  }
};

  return (
    <main className="flex flex-col items-center h-screen bg-gray-100">
  <div className="text-center mb-8">
    <h1 className="text-4xl font-bold mb-4 text-blue-500">Welcome to TechPower</h1>

    <img className="app-logo mx-auto mb-4" src={steveImage} alt="Good job Steve" />

    <div>A platform designed to connect employers with tech talent efficiently.</div>
  </div>

  <div className="user-info-container text-center bg-gray-200 p-4 rounded-md">
        <h2 className="text-2xl font-bold mb-2 text-blue-800">
        <div className="pb-card-user" key={techUser.user.id}>
             {'Welcome, '} {techUser.user.first_name} {techUser.user.last_name}
             
            </div>
            
        </h2>  

        {/* <fieldset className="mb-4" >
          <label className="block font-bold mb-1" key={techUser.user.id}>First Name:</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={techUser.user.first_name || "First Name"}
            readOnly
          />
        </fieldset> */}

        {/* <div className="form-field">
              <label className="block font-bold" htmlFor="affliate">Affliate:</label>
              <textarea
                className="textarea-field border p-2 w-full"
                id="affliate"
                onChange={updatePost}
                placeholder=""
                value={post.affliate}
                required
              />
            </div> */}

        {/* <fieldset className="mb-4">
          <label className="block font-bold mb-1" key={techUser.user.id}>Last Name:</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={techUser.user.last_name || "Last Name"}
            readOnly
          />
        </fieldset> */}

        {/* <fieldset className="mb-4">
          <label className="block font-bold mb-1" key={techUser.user.id}>Bio:</label>
          <textarea
            className="border p-2 w-full"
            value={techUser.user.bio || "Bio"}
            readOnly
          />
        </fieldset> */}

        {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-md mx-auto mb-4">Edit</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={() => handleDeleteClick()} >Delete</button> */}
      </div>
    </main>
  );
}