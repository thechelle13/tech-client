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
    <main className="form-parent">
  <form className="form-and-header">
    <div className="h1-div text-center">
      <h1 className="text-2xl font-bold">Edit Skills Form</h1>
    </div>
    <div className="form-container">
      <fieldset className="form-fieldset">
        <div className="form-field mb-4">
          <label htmlFor="label" className="block text-sm font-medium text-gray-600">
            Edited Skill:
          </label>
          <input
            className="input-field mt-1 p-2 block w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            id="label"
            onChange={updateSkill}
            type="text"
            placeholder="New Skill Name"
            value={skill.label}
            required
          />
        </div>
      </fieldset>
      <div className="button-div flex justify-center">
        <button className="button bg-blue-500 text-white" onClick={handleEditSave}>
          Save Edit
        </button>
        <button className="button bg-gray-500 text-white ml-2" onClick={() => navigate("/skills")}>
          Cancel
        </button>
      </div>
    </div>
  </form>
</main>

  );
};