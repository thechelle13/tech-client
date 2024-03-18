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
          const response = await fetch("https://techpower-app-yx7il.ondigitalocean.app/posts", {
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
        <main >
          <form className="form-and-header p-4 bg-gray-100 rounded shadow-md">
            <div className="h1-div mb-4">
              <h1 className="text-2xl font-bold">New Post Form</h1>
            </div>
            <div >
              <fieldset className="form-fieldset space-y-4">
                <div >
                 
                </div>
                <div >
                  <label className="block font-bold"  htmlFor="title">Title:</label>
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
                <div>
                  <label className="block font-bold"  htmlFor="content">Content:</label>
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
                <div >
                  <label className="block font-bold"  htmlFor="affliate">Affliate:</label>
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

                <div >
                  <label className="block font-bold" htmlFor="image_url">Image:</label>
                  <textarea
                    className="textarea-field border p-2 w-full"
                    id="image_url"
                    onChange={updatePost}
                    placeholder="http://"
                    value={post.image_url}
                    required
                    maxLength={200}
                  />
                  <p className="text-sm text-gray-600">Max Characters: 200</p>
                </div>
      
                <fieldset className="fieldset-div space-y-4">
                  <div >
                    <div className="skills-label font-bold"  >Skills:</div>
                    <div className="skills grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {skillLabels.map((s) => (
                        <div key={s.id}>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              id={`skill-${s.id}`}
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


                <fieldset className="fieldset-div space-y-4 ">
              <div >
              <label className="block font-bold"  htmlFor="area">Area:</label>
                <select
                  className="input border p-2 w-full"
                  id="area"
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
            <div className="button-div mt-4 flex items-center justify-center">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-700" onClick={postPost}>
                Add Post
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