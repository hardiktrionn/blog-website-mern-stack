import { Route, Routes } from "react-router-dom";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import UserLayout from "./layout/UserLayout";
import Home from "./pages/user/Home";
import Profile from "./pages/user/Profile";
import BlogDetails from "./pages/user/BlogDetails";
import EditProfile from "./pages/user/EditProfile";
import CreateBlog from "./pages/user/CreateBlog";
import UpdateBlogDetails from "./pages/user/UpdateBlogDetails";
import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./layout/AdminLayout";
import DashBoard from "./pages/admin/DashBoard";
import Users from "./pages/admin/Users";
import Blogs from "./pages/admin/Blogs";
import Edituser from "./pages/admin/Edituser";
import UserDetails from "./pages/user/userDetails";
import ErrorPage from "./pages/admin/components/ErrorPage";
import Pagenotfound from "./components/Pagenotfound";
import ChangePassword from "./pages/user/ChangePassword";
import ForgetPassword from "./pages/user/ForgetPassword";
import VerifyLink from "./pages/user/VerifyLink";
import NewPassword from "./pages/user/NewPassword";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/verify-link" element={<VerifyLink />} />
      <Route path="/new-password" element={<NewPassword />} />

      <Route path="/" element={<UserLayout />}>
        <Route path="" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="blog/:id" element={<BlogDetails />} />
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route path="create-blog" element={<CreateBlog />} />
        <Route path="user/:username" element={<UserDetails />} />
        <Route
          path="update-blog/:id"
          element={<UpdateBlogDetails to={"/profile"} />}
        />
        <Route
          path="*"
          element={<Pagenotfound to={"/"} label={"Back to Home Page"} />}
        />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route path="/admin/" element={<AdminLayout />}>
        <Route path="" element={<DashBoard />} />
        <Route path="users" element={<Users />} />
        <Route path="users/edit/:username" element={<Edituser />} />
        <Route path="blogs" element={<Blogs />} />
        <Route
          path="blogs/edit/:id"
          element={<UpdateBlogDetails to={"/admin/blogs"} />}
        />
        <Route
          path="*"
          element={<Pagenotfound to={"/admin"} label={"Back to DashBoard"} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
