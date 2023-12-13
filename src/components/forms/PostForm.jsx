import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./forms.css";
import { getSkills } from "../../services/skillServices";
import { getAreas } from "../../services/areaServices";

export const PostForm = ({token, setToken}) => {
    const [areaLabels, setAreaLabels] = useState([]);
    const [skillLabels, setSkillLabels] = useState([]);
    const [chosenSkills, updateChosenSkills] = useState(new Set());
    const [post, setPost] = useState({
        title: "",
        content: "",
        image_url: "",
        affliate: "",
        publication_date: new Date(),
        approved: true,
        area: 0,
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

      const updateArea = (e) => {
        const copy = { ...post };
        copy.area = e.target.value;
        setPost(copy);
      };
      const updateSkill = (s) => {
        const copy = new Set(chosenSkills);
        copy.has(s.id) ? copy.delete(s.id) : copy.add(s.id);
        updateChosenSkills(copy);
      };


      const postPost = async (evt) => {
        evt.preventDefault();
    
        // Retrieve the token from localStorage
        const authToken = localStorage.getItem("auth_token");
        // const authToken = token;
    
        // Check if the token is present
        if (!authToken) {
          console.error("Tech token not found in localStorage");
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
    
          navigate(`/postLists`);
        } catch (error) {
          console.error("Error posting post:", error);
        }
      };

      return (
        <main className="form-parent">
          <form className="form-and-header p-4 bg-gray-100 rounded shadow-md">
            <div className="h1-div mb-4">
              <h1 className="text-2xl font-bold">New Post Form</h1>
            </div>
            <div className="form-container">
              <fieldset className="form-fieldset space-y-4">
                <div className="form-field">
                  <label className="block font-bold">New Post:</label>
                </div>
                <div className="form-field">
                  <label className="block font-bold">Title:</label>
                  <textarea
                    className="textarea-field border p-2 w-full"
                    id="title"
                    onChange={updatePost}
                    placeholder="Enter the title"
                    value={post.title}
                    required
                    maxLength={20}
                  />
                  <p className="text-sm text-gray-600">Max Characters: 20</p>
                </div>
                <div className="form-field">
                  <label className="block font-bold">Content:</label>
                  <textarea
                    className="textarea-field border p-2 w-full"
                    id="content"
                    onChange={updatePost}
                    placeholder="Enter the content"
                    value={post.content}
                    required
                    maxLength={200}
                  />
                  <p className="text-sm text-gray-600">Max Characters: 200</p>
                </div>
                <div className="form-field">
                  <label className="block font-bold">Affliate:</label>
                  <textarea
                    className="textarea-field border p-2 w-full"
                    id="affliate"
                    onChange={updatePost}
                    placeholder="Enter a company or cohort"
                    value={post.affliate}
                    required
                    maxLength={200}
                  />
                  <p className="text-sm text-gray-600">Max Characters: 20</p>
                </div>

                <div className="form-field">
                  <label className="block font-bold">Image:</label>
                  <textarea
                    className="textarea-field border p-2 w-full"
                    id="image_url"
                    onChange={updatePost}
                    placeholder="Image"
                    value={post.image_url}
                    required
                    maxLength={200}
                  />
                  <p className="text-sm text-gray-600">Max Characters: 200</p>
                </div>
      
                <fieldset className="fieldset-div space-y-4">
                  <div className="skills-group">
                    <div className="skills-label font-bold">Skills:</div>
                    <div className="skills grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {skillLabels.map((s) => (
                        <div key={s.id}>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={chosenSkills.has(s.id)}
                              onChange={() => updateSkill(s)}
                            />
                            <span className="ml-2">{s.label}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </fieldset>


                <fieldset className="fieldset-div space-y-4 flex items-center justify-center">
              <div className="box-input">
              <label className="block font-bold">Area:</label>
                <select
                  className="input border p-2 w-full"
                  name="area"
                  onChange={updateArea}
                  value={post.area.id}
                >
                  <option value={0}>Please select an Area</option>
                  {areaLabels.map((typeObj) => {
                    return (
                      <option key={typeObj.id} value={typeObj.id}>
                        {typeObj.label}
                      </option>
                    );
                  })}
                </select>
              </div>
            </fieldset>
               
              </fieldset>
            </div>
            <div className="button-div mt-4">
              <button className="button bg-blue-500 text-white" onClick={postPost}>
                Add Post
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