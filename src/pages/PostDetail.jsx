import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById } from "../services/postServices";
import { getSkills } from "../services/skillServices";

export const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState(new Set());

  const navigate = useNavigate();

  const manageSkills = useRef();

  const handleContact = () => {
    // Assuming post has an email property. Adjust accordingly.
    const email = post.tech_user.user.email;

    if (email) {
      // Open a new window or modal with a mailto link
      window.open(`mailto:${email}`, "_blank");
    } else {
      console.error("No email found for the poster");
      // Handle the case where no email is available
    }
  };


  useEffect(() => {
    getSkills().then((skillsArray) => setSkills(skillsArray));
  }, []);

  useEffect(() => {
    getPostById(postId).then((post) => {
      setPost(post);
      if (post.skills) {
        setSelectedSkills(new Set(post.skills.map((skill) => skill.id)));
      }
    });
  }, [postId, skills]);

  const handleSelectedSkill = (skill) => {
    const copy = new Set(selectedSkills);
    copy.has(skill.id) ? copy.delete(skill.id) : copy.add(skill.id);
    setSelectedSkills(copy);
  };
//debugger

const saveNewSkills = async (event) => {
  try {
    event.preventDefault();

    const postCopy = { ...post };

    // Only update the skills field
    postCopy.skills = Array.from(selectedSkills);

    // Include required fields without changing their values
    const updatedPost = {
      title: postCopy.title || "", // Use current value or an empty string
      content: postCopy.content || "", // Use current value or an empty string
      image_url: postCopy.image_url || "", // Use current value or an empty string
      affliate: postCopy.affliate || "", // Use current value or an empty string
      approved: postCopy.approved || "", // Use current value or an empty string
      area: postCopy.area ? postCopy.area.id : "", // Use current value or an empty string
      skills: postCopy.skills,
      tech_user: post.tech_user.user.id,
    };

    // Use try-catch for better error handling
    const response = await fetch(`http://localhost:8000/posts/${postId}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`Failed to update post. Status: ${response.status}`);
    }

    // Assuming getSkills returns a Promise
    const skillsArray = await getSkills();

    // Assuming saveNewSkills takes an argument (skillsArray)
    // and is used for some other purpose. If not, remove this line.
    saveNewSkills(skillsArray);

    // Close the modal and navigate after successful update
    manageSkills.current.close();
    navigate(0);
  } catch (error) {
    console.error("Error in saveNewSkills:", error);
    // Handle the error, e.g., display a message to the user
  }
};





  // working
  const handleManageSkills = () => {
    if (manageSkills.current) {
      manageSkills.current.showModal();
    }
  };


//working
  const handleCloseSkills = () => {
    if (manageSkills.current) {
      manageSkills.current.close();
    }
  };

  return (
    <>
      <div className="card-item bg-gray-200 p-4 rounded-md">
        {post ? (
          <>
            <div className="card-header mb-4" key={post.id}>
              <div className="card-title text-xl font-bold">Title: {post.title}</div>
              <div className="card-author">Author: {post.tech_user.user.username}</div>
            </div>


            <div className="card-body mb-4" >Image:
            <img
                className="post-image"
                src={post.image_url} 
                alt="no photo available"
                width="400px"
              />

            </div>


            <div className="card-body mb-4">Affliate: {post.affliate}</div>
            <div className="card-body mb-4">Content: {post.content}</div>
            <div className="card-body mb-4">Area: {post.area.label}</div>
            <div className="card-footer">
              <div className="card-skills">
                <ul className="card-skill-header">Skills:  </ul>
                <div className="skills">
                  {post.skills.map((skill) => (
                    <li className="card-skill" key={skill.id}>
                      {skill.label}
                    </li>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>No post found.</p>
        )}
         <div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300" onClick={handleContact}>Contact</button>
        </div>
      </div>
      {post?.is_owner ? (
        <div className="flex items-center justify-center">
          <div className="manage-skills-div">
            <button className="manage-skills-button bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleManageSkills}>
              Manage Skills
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      <dialog className="manage-skills" ref={manageSkills}>
        <div className="skill-container">
          {skills
            ? skills.map((skill) => (
                <div key={skill.id} className="mb-2">
                  <input
                    type="checkbox"
                    id={`skill-${skill.id}`}
                    checked={selectedSkills.has(skill.id)}
                    onChange={() => handleSelectedSkill(skill)}
                  />
                  <span className="ml-2">{skill.label}</span>
                </div>
              ))
            : "No skills found"}
        </div>
       
        <div className="btn-div mt-4">
          <button className="save-skill-btn bg-green-500 text-white px-4 py-2 rounded-md" onClick={saveNewSkills}>
            Save Skill Selection
          </button>
          <button className="close-skill-btn bg-gray-500 text-white px-4 py-2 rounded-md ml-2" onClick={handleCloseSkills}>
            Close
          </button>
        </div>
      </dialog>
    </>
  );
};