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
      <main className="text-center my-8 bg-gray-400 p-6 rounded-lg shadow-lg max-w-md mx-auto" >
        <form className="form-and-header p-4 bg-gray-100 rounded shadow-md">
          <div className="h1-div mb-4">
            <h1 className="text-2xl font-bold">New Skill Form</h1>
          </div>
          <div >
            <fieldset className="form-fieldset">
              <div >
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
          <div className="button-div mt-4 flex items-center justify-center">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-700" onClick={handleSave}>
              Submit Skill
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-700"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    );
    
}