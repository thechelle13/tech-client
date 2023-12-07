import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./forms.css";
import { createSkill } from "../../services/skillServices";

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

    return (
      <main className="form-parent">
        <form className="form-and-header p-4 bg-gray-100 rounded shadow-md">
          <div className="h1-div mb-4">
            <h1 className="text-2xl font-bold">New Skill Form</h1>
          </div>
          <div className="form-container">
            <fieldset className="form-fieldset">
              <div className="form-field">
                <label className="block font-bold">New Skill:</label>
                <input
                  className="input-field border p-2 w-full"
                  id="label"
                  onChange={updateSkill}
                  type="text"
                  placeholder="Skill Name"
                  value={skill.label}
                  required
                />
              </div>
            </fieldset>
          </div>
          <div className="button-div mt-4">
            <button className="button bg-blue-500 text-white" onClick={handleSave}>
              Submit Skill
            </button>
            <button
              className="button bg-gray-500 text-white ml-2"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    );
    
}