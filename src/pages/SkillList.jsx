import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { deleteSkill, getSkills } from "../services/skillServices.jsx";

export const SkillList = ({ setToken, token }) => {
  const [skills, setSkills] = useState([]);
  const [sortedSkills, setSortedSkills] = useState([]);

  let navigate = useNavigate();

  const getAndSetSkills = () => {
    getSkills().then((skillsArray) => {
      setSkills(skillsArray);
    });
  };

  useEffect(() => {
    getAndSetSkills();
  }, []);

  useEffect(() => {
    const sorted = [...skills].sort((a, b) => a.label.localeCompare(b.label));
    setSortedSkills(sorted);
  }, [skills]);

  const handleDelete = (skillId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this skill?"
    );
    if (confirmDelete) {
      deleteSkill(skillId).then(() => {
        getAndSetSkills();
      });
    }
  };

  return (
    <>
      <div className="page-title">Skills</div>
      <button className="btn-div" onClick={() => navigate("/create-skill")}>
        ADD NEW Skill
      </button>
      <div className="content">
        {sortedSkills && sortedSkills.length ? (
          sortedSkills.map((skill) => (
            <div className="category-item" key={skill.id}>
                <div className="card-label">{skill.label}</div>
                <div className="cat-btn-div">
                  <button onClick={() => navigate(`/edit-skill/${skill.id}`)}>Edit</button>
                  <button onClick={() => handleDelete(skill.id)}>Delete</button>
                </div>
            </div>
          ))
        ) : (
          <p>No Skills found.</p>
        )}
      </div>
    </>
  );
};