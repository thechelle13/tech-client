import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./forms.css";
import { getSkills } from "../../services/skillServices";
import { getAreas } from "../../services/areaServices";

export const PostForm = ({token, setToken}) => {
    const [areaLabels, setAreaLabels] = useState([]);
    const [chosenArea, updateChosenArea] = useState(new Set());
    const [skillLabels, setSkillLabels] = useState([]);
    const [chosenSkills, updateChosenSkills] = useState(new Set());
    const [post, setPost] = useState({
        title: "",
        content: "",
        publication_date: new Date(),
        approved: true,
        
      });

      let navigate = useNavigate();

      useEffect(() => {
        getSkills().then((skillArray) => {
          setSkillLabels(skillArray);
        });

        getAreas().then((areaArray) => {
          setAreaLabels(areaArray)
        })
      }, []);

      
    
      const updatePost = (e) => {
        const copy = { ...post };
        copy[e.target.id] = e.target.value;
        setPost(copy);
      };

      // const updateArea = (e) => {
      //   const copy = { ...post };
      //   copy.area = e.target.value;
      //   setPost(copy);
      // };

      const handleSkillChosen = (s) => {
        const copy = new Set(chosenSkills);
        copy.has(s.id) ? copy.delete(s.id) : copy.add(s.id);
        updateChosenSkills(copy);
      };

//debugger
      // const handleAreaChosen = (a) => {
      //   const copy = new Set(chosenArea);
      //   copy.has(a.id) ? copy.delete(a.id) : copy.add(a.id);
      //   updateChosenArea(copy);
      // };

      const handleAreaChosen = (selectedArea) => {
        const copy = new Set(chosenArea);
        const areaId = selectedArea.id;
      
        copy.has(areaId) ? copy.delete(areaId) : copy.add(areaId);
        updateChosenArea(copy);
      };
      
    

//debugger
      const postPost = async (evt) => {
        evt.preventDefault();
    
        // Retrieve the token from localStorage
        const authToken = localStorage.getItem("auth_token");
        // const authToken = token;
    
        // Check if the token is present
        if (!authToken) {
          console.error("Rock token not found in localStorage");
          return;
        }
    
        try {
          // Send a POST request to create a new post
          const response = await fetch("http://localhost:8000/posts", {
            method: "POST",
            headers: {
              Authorization: `Token ${localStorage.getItem("auth_token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...post, skills: Array.from(chosenSkills)}),
          });
    
          if (!response.ok) {
            console.error("Error posting post:", response.statusText);
            return;
          }
    
          // Parse the response to get the newly created post's ID
          const createdPost = await response.json();
          const postId = createdPost.id;
    
          // Navigate to the detail page of the created post
          navigate(`/postLists/${postId}`);
        } catch (error) {
          console.error("Error posting post:", error);
        }
      };

    return  (
    <main className="form-parent">
    <form className="form-and-header">
      <div className="h1-div">
        <h1>New Post Form</h1>
      </div>
      <div className="form-container">
        <fieldset className="form-fieldset">
          <div className="form-field">
            <label>New Post:</label>
            
          </div>
          <div className="form-field">
            <label>Title:</label>
            <textarea
              className="textarea-field"
              id="title"
              onChange={updatePost}
              placeholder="text here"
              value={post.title}
              required
              maxLength={20}
            />
            Max Char 20
          </div>
          <div className="form-field">
            <label>Content:</label>
            <textarea
              className="textarea-field"
              id="content"
              onChange={updatePost}
              placeholder="text here"
              value={post.content}
              required
              maxLength={200}
            />
            Max Characters 200
          </div>
         
          <fieldset className="fieldset-div">
            <div className="skills-group">
              <div className="skills-label">Skills:</div>
              {/* Map through categories and render checkboxes */}
              <div className="skills">
                {skillLabels.map((s) => (
                  <div className="skill" key={s.id}>
                    <label>
                      <input
                        type="checkbox"
                        checked={chosenSkills.has(s.id)}
                        onChange={() => handleSkillChosen(s)}
                      />
                      {s.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </fieldset>

            <fieldset className="fieldset-div">
              <div className="box-input">
                <div>Area:</div>
                <select
  className="input"
  name="area"
  onChange={(e) => handleAreaChosen(e.target.selectedOptions[0])}
  value={post.area}
>
  <option value={0}>Please select an Area</option>
  
  {areaLabels.map((areaObj) => {
    return (
      <option key={areaObj.id} value={areaObj.id}>
        {areaObj.label}
      </option>
    );
  })}
</select>

              </div>
            </fieldset>

        </fieldset>
      </div>
      <div className="button-div">
        <button className="cancel-button" onClick={postPost}>Add Post</button>
        <button className="cancel-button" onClick={() => navigate(-1)}>
            Cancel
          </button>
      </div>
    </form>
  </main>
);
}