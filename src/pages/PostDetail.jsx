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

  const saveNewSkills = async (event) => {
    event.preventDefault();
    const postCopy = { ...post };
    postCopy.skills = Array.from(selectedSkills);

    const updatedPost = {
      title: postCopy.title,
      content: postCopy.content,
      approved: postCopy.approved,
      area: postCopy.area.id,
      skills: postCopy.skills,
    };
    // debugger
    await fetch(`http://localhost:8000/posts/${postId}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    });
    getSkills().then((skillsArray) => setSkills(skillsArray));
    manageSkills.current.close();
    // navigate(0)
  };

  const handleManageSkills = () => {
    if (manageSkills.current) {
      manageSkills.current.showModal();
    }
  };

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
            <div className="card-body mb-4">Content: {post.content}</div>
            <div className="card-body mb-4">Area: {post.area.label}</div>
            <div className="card-footer">
              <div className="card-skills">
                <ul className="card-skill-header">Skills: </ul>
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
      </div>
      {post?.is_owner ? (
        <div className="manage-skills-div">
          <button className="manage-skills-button bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleManageSkills}>
            Manage Skills
          </button>
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