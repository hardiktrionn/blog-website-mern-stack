import { Outlet, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { useEffect } from "react";
import Sidebar from "../pages/admin/components/Sidebar";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { user, checkAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    auththeUser();
  }, []);

  let auththeUser = async () => {
    if (!user && !isAuthenticated) {
      let res = await checkAuth();
      if (!res) {
        navigate("/admin/login");
        return;
      }

      if (user && user.role !== "admin") {
        navigate("/");
        return;
      }
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="mx-20 my-4 w-[80%] overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
