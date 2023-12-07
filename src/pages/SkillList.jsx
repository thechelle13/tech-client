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
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4 text-center">Skills</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
        onClick={() => navigate("/create-skill")}
      >
        ADD NEW Skill
      </button>
      <div>
        {sortedSkills && sortedSkills.length ? (
          sortedSkills.map((skill) => (
            <div className="bg-gray-100 rounded-md p-4 mb-4" key={skill.id}>
              <div className="text-xl font-semibold mb-2">{skill.label}</div>
              <div className="flex items-center space-x-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={() => navigate(`/edit-skill/${skill.id}`)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                  onClick={() => handleDelete(skill.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No Skills found.</p>
        )}
      </div>
    </div>
  );
        }  