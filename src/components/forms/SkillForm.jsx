import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./forms.css";

export const SkillForm = () => {
    const [skill, setSkill] = useState({
        label: "",
    })

    const updateSkill = (e) => {
        const copy = { ...skill };
        copy[e.target.id] = e.target.value;
    
        setSkill(copy);
      };
    
      const handleSave = (evt) => {
        evt.preventDefault();
    
        const newSkill = {
          label: skill.label,
        };
        createSkill(newSkill).then(() => {
          navigate("/skills");
        });
      };

    let navigate = useNavigate();

    return  (
    <main className="form-parent">
    <form className="form-and-header">
      <div className="h1-div">
        <h1>New Skill Form</h1>
      </div>
      <div className="form-container">
        <fieldset className="form-fieldset">
          <div className="form-field">
            <label>New Skill:</label>
            <input
              className="input-field"
              id="label"
              onChange={updateSkill}
              type="text"
              placeholder="skill Name"
              value={skill.label}
              required
            />
          </div>
        </fieldset>
        <div className="button-div">
          <button className="cancel-button" onClick={handleSave}>
            Submit Skill
          </button>
          <button className="cancel-button" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  </main>
);
}