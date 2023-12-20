import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editPost, getPostById } from "../../services/postServices";
import "./forms.css";;
import { getAreas } from "../../services/areaServices";


export const EditPostForm = ({token, setToken}) => {
  const [areaLabels, setAreaLabels] = useState([]);
  const [post, setPost] = useState({
    title: "",
    image_url: "",
    affliate: "",
    content: "",
    publication_date: new Date(),
    approved: true,
    area: 1,
   
  });

  const { postId } = useParams();

  let navigate = useNavigate();
  
  useEffect(() => {
    getAreas().then((areaArray) => {
    setAreaLabels(areaArray)
  })
}, []);

  useEffect(() => {
    getPostById(postId).then((postObj) => {
      setPost(postObj);
    });
  }, [postId]);

  
  const updatePost = (e) => {
    const copy = { ...post };
    copy[e.target.id] = e.target.value;
    setPost(copy);
  };

  const updateArea = (e) => {
    const copy = { ...post };
    copy.area = { id: e.target.value }; 
    // copy.area = e.target.value;
    setPost(copy);
  };


  const handleCancel = () => {
    navigate("/postLists");
  };

  const handleSave = (event) => {
    event.preventDefault();
  
    const updatedItem = {
      id: post.id, 
      title: post.title,
      image_url: post.image_url,
      affliate: post.affliate,
      content: post.content,
      approved: true,
      area: post.area.id,
      tech_user: post.tech_user.user.id,
      skills: post.skills.map((skill) => skill.id),
    };
  
    
  
    editPost(updatedItem).then(() => {
      navigate(`/postLists/${postId}`);
    });
  };
  
  return (
    <main className="form-parent">
      <form className="form-and-header p-4 bg-gray-100 rounded shadow-md">
        <div className="h1-div mb-4">
          <h1 className="text-2xl font-bold">Edit Post Form</h1>
        </div>
        <div className="form-container">
          <fieldset className="form-fieldset space-y-4">
            <div className="form-field">
              <label className="block font-bold" htmlFor="title">Title:</label>
              <input
                className="input-field border p-2 w-full"
                id="title"
                onChange={updatePost}
                type="text"
                placeholder=""
                value={post.title}
                
              />
            </div>

            {/* Uncomment the following block if you want to include an image field */}
            <div className="form-field">
              <label className="block font-bold" htmlFor="image_url">Image:</label>
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
            </div>

            <div className="form-field">
              <label className="block font-bold" htmlFor="affliate">Affliate:</label>
              <textarea
                className="textarea-field border p-2 w-full"
                id="affliate"
                onChange={updatePost}
                placeholder=""
                value={post.affliate}
                
              />
            </div>

            <div className="form-field">
              <label className="block font-bold" htmlFor="content">Content:</label>
              <textarea
                className="textarea-field border p-2 w-full"
                id="content"
                onChange={updatePost}
                placeholder=""
                value={post.content}
                
              />
            </div>

            
              <div className="box-input">
              <label className="block font-bold"  htmlFor="area">Area:</label>
                <select
                  className="input border p-2 w-full"
                  id="area" 
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
         

            <div className="form-field">
  <label className="block font-bold" htmlFor="content">
    Skills:
  </label>
  <div className="flex flex-wrap">
    {post.skills && post.skills.length > 0 ? (
      post.skills.map((skill, index) => (
        <div key={index} className="mb-2 mr-2">
          {skill.label}
          {index !== post.skills.length - 1 && <span className="mx-2">•</span>}
        </div>
      ))
    ) : (
      <p>No skills available</p>
    )}
  </div>
</div>

           
          </fieldset>        
             
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