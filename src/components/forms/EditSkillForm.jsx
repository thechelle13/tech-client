import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createSkill, editSkill, getSkillsByID } from "../../services/skillServices";

export const EditSkillForm = () => {
  const { skillId } = useParams();
  const [skill, setSkill] = useState({
    label: "",
  });

  useEffect(() => {
    getSkillsByID(skillId).then((skill) => setSkill(skill));
  }, [skillId]);

  let navigate = useNavigate();

  const updateSkill = (e) => {
    const copy = { ...skill };
    copy[e.target.id] = e.target.value;

    setSkill(copy);
  };

  const handleEditSave = (evt) => {
    evt.preventDefault();
    const copy = { ...skill };
    editSkill(copy).then(() => {
      navigate("/skills");
    });
  };

  return (
    <main className="text-center my-8 bg-gray-400 p-6 rounded-lg shadow-lg max-w-md mx-auto">
  <form >
    <div className="h1-div text-center">
      <h1 className="text-2xl font-bold">Edit Skills Form</h1>
    </div>
    <div >
      <fieldset >
        <div className="mb-4">
          <label htmlFor="skill" className="block text-sm font-medium text-gray-600">
            Edited Skill:
          </label>
          <input
            className="input-field mt-1 p-2 block w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            id="skill"
            onChange={updateSkill}
            type="text"
            placeholder="New Skill Name"
            value={skill.label}
            required
          />
        </div>
      </fieldset>
      <div className="flex justify-center">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-700" onClick={handleEditSave}>
          Save Edit
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-700" onClick={() => navigate("/skills")}>
          Cancel
        </button>
      </div>
    </div>
  </form>
</main>

  );
};