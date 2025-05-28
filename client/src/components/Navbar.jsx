import { FaBloggerB } from "react-icons/fa6";
import { RiAccountCircleFill } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { user } = useAuthStore();

  const onSearch = (e) => {
    if (e.key == "Enter") {
      if (search.length) {
        navigate(`/blog?search=${search}`);
        setSearch("");
      }
    }
  };
  return (
    <div className="w-full py-5 border-b-2 border-gray-400 bg-white flex items-center px-5 sticky top-0 z-20">
      <Link to={"/"} className="btn-center">
        <FaBloggerB size={30} />
      </Link>

      <div className="w-[30vw] ml-20">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <FaSearch />
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Search Blogs"
            required
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={onSearch}
          />
          <button
            onClick={() => {
              if (search.length) navigate(`/blog?search=${search}`);
              setSearch("");
            }}
            className="text-white absolute end-2.5 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3"
          >
            <FaSearch />
          </button>
        </div>
      </div>

      <div className="absolute right-16 flex space-x-4">
        <Link to={"/CreateBlog"} className="btn-center">
          <FaRegEdit size={23} />
        </Link>
        {/* <button className="btn-center">
          <IoNotificationsSharp size={23} />
        </button> */}
        <Link to={"/Profile"} className="btn-center">
          {user?.picture ? (
            <img
              src={`${import.meta.env.VITE_API_URL}/uploads/${user.picture}`}
              alt="user"
              className="w-8 object-fill h-8 rounded-full "
            />
          ) : (
            <RiAccountCircleFill size={23} />
          )}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
