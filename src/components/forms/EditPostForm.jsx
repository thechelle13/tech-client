import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editPost, getPostById } from "../../services/postServices";
import "./forms.css";

export const EditPostForm = () => {
 
  const [post, setPost] = useState({
    title: "",
    content: "",
    publication_date: new Date(),
    approved: true,
  });

  const { postId } = useParams();

  let navigate = useNavigate();

  

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
      area: post.area,
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
      <form className="form-and-header">
        <div className="h1-div">
          <h1>Edit Post Form</h1>
        </div>
        <div className="form-container">
          <fieldset className="form-fieldset">
            <div className="form-field">
              <label>Title:</label>
              <input
                className="input-field"
                id="title"
                onChange={updatePost}
                type="text"
                placeholder=""
                value={post.title}
                required
              />
            </div>
            {/* <div className="form-field">
              <label>Image:</label>
              <input
                className="input-field"
                id="image_url"
                onChange={updatePost}
                type="text"
                placeholder=""
                value={post.image_url}
                required
                maxLength={200}
              />
              Max Characters 200
            </div> */}
            <div className="form-field">
              <label>Content:</label>
              <textarea
                className="textarea-field"
                id="content"
                onChange={updatePost}
                placeholder=""
                value={post.content}
                required
              />
            </div>
           
          </fieldset>
        </div>
        <div className="button-div">
          <button className="cancel-button" onClick={handleSave}>Edit Post</button>
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};