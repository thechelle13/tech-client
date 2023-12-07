import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editPost, getPostById } from "../../services/postServices";
import "./forms.css";
import { getAreaByID } from "../../services/areaServices";

export const EditPostForm = () => {

  const [post, setPost] = useState({
    title: "",
    content: "",
    publication_date: new Date(),
    approved: true,
    area: 1,
  });

  const { postId } = useParams();
  const { areaId } = useParams();
  const { skillId } = useParams();

  let navigate = useNavigate();

  // useEffect(() => {
  //   getAreaByID(areaId).then((areaObj) => {
  //     setAreaLabels(areaObj)
  //   })
  // }, [areaId]);
  
  useEffect(() => {
    getPostById(postId).then((postObj) => {
      setPost(postObj);
    });
  }, [postId]);

  // useEffect(() => {
  //   getSkillById(skillId).then((skillObj) => {
  //     setSkillLabels(skillObj);
  //   });
  // }, [skillId]);

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
  // const updateSkill = (s) => {
  //   const copy = new Set(chosenSkills);
  //   copy.has(s.id) ? copy.delete(s.id) : copy.add(s.id);
  //   updateChosenSkills(copy);
  // };


  const handleCancel = () => {
    navigate("/postLists");
  };

  const handleSave = async(event) => {
    event.preventDefault();

    const updatedItem = {
      id: post.id, 
      title: post.title,
      content: post.content,
      approved: true,
      skills: post.skills.map((skill) => skill.id),
      area: post.area.id,
    };
    try {
      const response = await editPost(updatedItem);
  
      if (!response.ok) {
        console.error("Error updating post:", response.statusText);
        console.log(response)
        // Handle the error appropriately (e.g., show a message to the user)
        return;
      }
  
      // Assuming that the updated post is returned in the response
      const updatedPost = await response.json();
  
      // Now you can navigate to the updated post
      navigate(`/postLists/${updatedPost.id}`);
    } catch (error) {
      console.error("Error updating post:", error);
      // Handle the error appropriately (e.g., show a message to the user)
    }
  };


  //   editPost(updatedItem).then(() => {
  //     navigate(`/postLists/${postId}`);
  //   });
  // };

  return (
    <main className="form-parent">
      <form className="form-and-header p-4 bg-gray-100 rounded shadow-md">
        <div className="h1-div mb-4">
          <h1 className="text-2xl font-bold">Edit Post Form</h1>
        </div>
        <div className="form-container">
          <fieldset className="form-fieldset space-y-4">
            <div className="form-field">
              <label className="block font-bold">Title:</label>
              <input
                className="input-field border p-2 w-full"
                id="title"
                onChange={updatePost}
                type="text"
                placeholder=""
                value={post.title}
                required
              />
            </div>
            {/* Uncomment the following block if you want to include an image field */}
            {/* <div className="form-field">
              <label className="block font-bold">Image:</label>
              <input
                className="input-field border p-2 w-full"
                id="image_url"
                onChange={updatePost}
                type="text"
                placeholder=""
                value={post.image_url}
                required
                maxLength={200}
              />
              <p className="text-sm text-gray-600">Max Characters: 200</p>
            </div> */}
            <div className="form-field">
              <label className="block font-bold">Content:</label>
              <textarea
                className="textarea-field border p-2 w-full"
                id="content"
                onChange={updatePost}
                placeholder=""
                value={post.content}
                required
              />
            </div>
            {/* <div className="form-field">
            <label className="block font-bold">Area:</label>
            <select
                className="textarea-field border p-2 w-full"
                id="content"
                onChange={updatePost}
                placeholder=""
                value={post.area.id}
                
                required
              />
              
              </div> */}

            <fieldset className="fieldset-div space-y-4">
              <div className="form-field">
              <label className="block font-bold">Area:</label>
                <select
                  className="input border p-2 w-full"
                  name="area"
                  onChange={updatePost}
                  value={post.area.id}
                >
                  <option value={0}>Please select an Area</option>
                  {Array.isArray(post.area.id) ? (
                  post.area.map((typeObj) => (
                  <option key={typeObj.id} value={typeObj.id}>
                  {typeObj.label}
                  </option>
                  ))
                  ) : (
                  <option key={post.area.id} value={post.area.id}>
                  {post.area.label}
                  </option>
                  )}
                </select>
              </div>
            </fieldset>

          </fieldset>
          {/* <fieldset className="fieldset-div space-y-4">
                  <div className="skills-group">
                    <div className="skills-label font-bold">Skills:</div>
                    <div className="skills grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {skillLabels.map((s) => (
                        <div key={s.id}>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={chosenSkills.has(s.id)}
                              onChange={() => updatePost(s)}
                            />
                            <span className="ml-2">{s.label}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </fieldset> */}
          
             
        </div>
        <div className="button-div mt-4">
          <button className="button bg-blue-500 text-white" onClick={handleSave}>
            Edit Post
          </button>
          <button
            className="button bg-gray-500 text-white ml-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
          }