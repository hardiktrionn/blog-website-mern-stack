import { useEffect } from "react";
import { BiLogoBlogger } from "react-icons/bi";
import { HiMiniUsers } from "react-icons/hi2";
import { Link } from "react-router-dom";
import useDashBoardStore from "../../store/useDashBoardStore";
import useBlogStore from "../../store/useBlogStore";

const Dashboard = () => {
  const { setCurrentPage, currentPage, fetchUsers, users } =
    useDashBoardStore();
  const { fetchAllBlogs, allBlogs } = useBlogStore();

  useEffect(() => {
    if (currentPage !== "dashboard") {
      setCurrentPage("dashboard");

      fetchUsers();
      fetchAllBlogs();
    }
  }, []);

  return (
    <section className="w-[80%] mx-20 my-4 grid grid-cols-3 gap-5">
      <Link
        to="/Admin/users"
        className="w-full flex items-center bg-white border shadow shadow-gray-500 border-gray-400 rounded-md px-6 py-3"
      >
        <div className="w-[40%]">
          <HiMiniUsers size={60} />
        </div>
        <div className=" flex flex-col w-[60%] items-end">
          <span className="text-2xl font-bold ">{users.length || 0}</span>
          <p className="font-semibold text-2xl">Users</p>
        </div>
      </Link>
      <Link
        to="/Admin/blogs"
        className="w-full flex items-center bg-white border shadow shadow-gray-500 border-gray-400 rounded-md px-6 py-3"
      >
        <div className="w-[40%]">
          <BiLogoBlogger size={60} />
        </div>
        <div className=" flex flex-col w-[60%] items-end">
          <span className="text-2xl font-bold ">{allBlogs.length || 0}</span>
          <p className="font-semibold text-2xl">Blogs</p>
        </div>
      </Link>
    </section>
  );
};

export default Dashboard;
