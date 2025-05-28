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
import SearchBlog from "./pages/user/SearchBlog";
import ErrorPage from "./pages/admin/components/ErrorPage";
import Pagenotfound from "./components/Pagenotfound";

function App() {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />

      <Route path="/" element={<UserLayout />}>
        <Route path="" element={<Home />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="blog/:id" element={<BlogDetails />} />
        <Route path="EditProfile" element={<EditProfile />} />
        <Route path="CreateBlog" element={<CreateBlog />} />
        <Route path="user/:username" element={<UserDetails />} />
        <Route path="blog" element={<SearchBlog />} />
        <Route
          path="updateBlog/:id"
          element={<UpdateBlogDetails to={"/profile"} />}
        />
        <Route
          path="*"
          element={<Pagenotfound to={"/"} label={"Back to Home Page"} />}
        />
      </Route>

      <Route path="/Admin/Login" element={<AdminLogin />} />

      <Route path="/Admin/" element={<AdminLayout />}>
        <Route path="" element={<DashBoard />} />
        <Route path="users" element={<Users />} />
        <Route path="users/edit/:username" element={<Edituser />} />
        <Route path="blogs" element={<Blogs />} />
        <Route
          path="blogs/edit/:id"
          element={<UpdateBlogDetails to={"/Admin/blogs"} />}
        />
        <Route
          path="*"
          element={<Pagenotfound to={"/Admin"} label={"Back to DashBoard"} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
