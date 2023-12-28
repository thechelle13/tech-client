import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteSkill, getSkills } from "../services/skillServices.jsx";
import steveImage from '../assets/steve.png';

import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';

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
      <div className="flex items-center justify-center mb-4">
        <img className="app-logo mr-4" src={steveImage} alt="Good job Steve" />
        <h1 className="text-3xl font-semibold text-center">Skills</h1>
        <img className="app-logo ml-4" src={steveImage} alt="Good job Steve" />
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
          onClick={() => navigate("/create-skill")}
        >
          ADD NEW Skill
        </button>
      </div>
      <div>
        {sortedSkills && sortedSkills.length ? (
          sortedSkills.map((skill) => (
            <div className="bg-gray-100 rounded-md p-4 mb-4 flex items-center justify-between" key={skill.id}>
              <div className="text-xl font-semibold">{skill.label}</div>
              <div className="flex items-center space-x-4">
                <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => navigate(`/edit-skill/${skill.id}`)}
                  >
                  <PencilAltIcon className="h-5 w-5" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(skill.id)}
                  >
                  <TrashIcon className="h-5 w-5" />

                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No Skills found.</p>
        )}
      </div>
    </div>
  );

}


