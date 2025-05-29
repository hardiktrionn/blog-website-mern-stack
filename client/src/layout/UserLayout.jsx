import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import useAuthStore from "../store/useAuthStore";
import { useEffect } from "react";
import useBlogStore from "../store/useBlogStore";
import { useCookies } from "react-cookie";

const userLayout = () => {
  const navigate = useNavigate();
  const { user, checkAuth, isAuthenticated } = useAuthStore();
  const [cookies, setCookies, removeCookies] = useCookies("token");
  const { fetchBlogs } = useBlogStore();

  useEffect(() => {
    auththeUser();
  }, []);

  let auththeUser = async () => {
    if (!user && !isAuthenticated) {
      let res = await checkAuth();
      if (!res) {
        navigate("/login");
        removeCookies("token");
        return;
      }

      fetchBlogs();
    }
  };

  return (
    <>
      <Navbar />
      <div className=" md:px-40 px-4">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default userLayout;
