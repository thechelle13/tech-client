import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { Home } from "../pages/Home";
import { PostList } from "../pages/PostList";
import { SkillList } from "../pages/SkillList";
import { PostDetail } from "../pages/PostDetail";
import { MyPosts } from "../pages/MyPosts";
import { SkillForm } from "../components/forms/SkillForm";
import { PostForm } from "../components/forms/PostForm";
import { EditSkillForm } from "../components/forms/EditSkillForm";
import { EditPostForm } from "../components/forms/EditPostForm";
import { EditUserForm } from "../components/forms/EditUserForm"

export const ApplicationViews = ({ token, setToken }) => {
  return (
    <> 
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route element={<Authorized token={token} />}>
          {/* Add Routes here */}
          <Route path="/" element={<Home token={token} setToken={setToken} />} />

          <Route path="/edit-user" element={<EditUserForm token={token} setToken={setToken} />} />

          <Route
            path="/postLists"
            element={<PostList token={token} setToken={setToken} />}   />

          <Route
            path="/postLists/:postId"
            element={<PostDetail token={token} setToken={setToken} />}  />
          
          <Route
            path="/postList/:postId/edit-post"
            element={<EditPostForm token={token} setToken={setToken} />}  />
          
          <Route
            path="/create-post"
            element={<PostForm token={token} setToken={setToken} />}   />

          <Route
            path="/myPosts"
            element={<MyPosts token={token} setToken={setToken} />}    />

          <Route
            path="/skills"
            element={<SkillList token={token} setToken={setToken} />}   />
          
          <Route
            path="/create-skill"
            element={<SkillForm token={token} setToken={setToken} />}     />

          <Route
            path="/edit-skill/:skillId"
            element={<EditSkillForm token={token} setToken={setToken} />}  />

        </Route>
      </Routes>
    </>
  );
};
