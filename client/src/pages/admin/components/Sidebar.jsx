import { BiLogoBlogger } from "react-icons/bi";
import { HiMiniUsers } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import useDashBoardStore from "../../../store/useDashBoardStore";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { IoHome } from "react-icons/io5";
import useAuthStore from "../../../store/useAuthStore";
import { useCookies } from "react-cookie";

const Sidebar = () => {
  const navigate = useNavigate();
  const { currentPage } = useDashBoardStore();
  const [cookies, setCookies, removeCookies] = useCookies("token");
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    let res = await logout();
    if (res) {
      removeCookies("token");
      navigate("/Admin/Login");
    }
  };
  return (
    <aside className="flex flex-col justify-between bg-gradient-to-br from-gray-800 to-gray-900 text-white inset-0 w-[20%] rounded-xl my-4 ml-4">
      <div className="border-b border-gray-50/50">
        <Link to={"/Admin"} className="flex items-center gap-4 py-6 px-8">
          <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
            Blogs Dashboard
          </h6>
        </Link>
      </div>

      <div className="m-4 block h-[90%]">
        <ul className="mb-4 flex flex-col gap-x-1 gap-y-2">
          <li>
            <Link
              to="/Admin"
              className={`middle none font-sans font-bold center transition-all text-xs py-3 rounded-lg ${
                currentPage == "dashboard" ? "bg-blue-500" : "bg-gray-500"
              } w-full flex items-center gap-4 px-4 capitalize`}
            >
              <IoHome size={20} />
              <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                DashBoard
              </p>
            </Link>
          </li>
          <li>
            <Link
              to="/Admin/users"
              className={`middle none font-sans font-bold center transition-all text-xs py-3 rounded-lg ${
                currentPage == "users" ? "bg-blue-500" : "bg-gray-500"
              } w-full flex items-center gap-4 px-4 capitalize`}
            >
              <HiMiniUsers size={20} />
              <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                Users
              </p>
            </Link>
          </li>
          <li>
            <Link
              to="/Admin/blogs"
              className={`middle none font-sans font-bold center transition-all text-xs py-3 rounded-lg ${
                currentPage == "blogs" ? "bg-blue-500" : "bg-gray-500"
              } w-full flex items-center gap-4 px-4 capitalize`}
            >
              <BiLogoBlogger size={20} />
              <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                Blogs
              </p>
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-full border-t border-gray-50/50 flex items-center justify-center p-2">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 py-2 px-4 font-semibold leading-relaxed text-white bg-red-500 rounded-md text-lg cursor-pointer"
        >
          <RiLogoutBoxRLine size={22} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
