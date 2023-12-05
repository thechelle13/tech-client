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
        <div className="h1-div">
          <h1>Edit Skills Form</h1>
        </div>
        <div className="form-container">
          <fieldset className="form-fieldset">
            <div className="form-field">
              <label>Edited Skill:</label>
              <input
                className="input-field"
                id="label"
                onChange={updateSkill}
                type="text"
                placeholder="New Skill Name"
                value={skill.label}
                required
              />
            </div>
          </fieldset>
          <div className="button-div">
            <button className="cancel-button" onClick={handleEditSave}>
              Save Edit
            </button>
            <button className="cancel-button" onClick={() => navigate("/skills")}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};