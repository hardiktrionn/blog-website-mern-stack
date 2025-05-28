import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import { RiAccountCircleFill, RiLogoutBoxRLine } from "react-icons/ri";
import { MdModeEdit, MdOutlinePublic } from "react-icons/md";
import useBlogStore from "../../store/useBlogStore";
import getTimeAgo from "../../utils/getTimeAgo";
import { FaLock } from "react-icons/fa6";
import { useCookies } from "react-cookie";

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { blogs, deleteBlog } = useBlogStore();
  const [cookies, setCookies, removeCookies] = useCookies("token");

  const handleLogout = async () => {
    let res = await logout();
    if (res) {
      removeCookies("token");
      navigate("/Login");
    }
  };
  return (
    <div className="flex h-[90vh]">
      <div className="w-[65%] px-10 py-10 overflow-y-auto">
        <div className="border-b-2 border-gray-300 py-5 mb-5">
          <h1 className="text-3xl font-bold">My Blogs</h1>
        </div>
        {blogs.length > 0 ? (
          blogs.map((item, i) => (
            <div key={i} className="border-b-2 border-gray-300 py-5">
              <Link to={`/blog/${item?._id}`}>
                <div className="flex items-center space-x-2 font-semibold">
                  <img
                    className="w-6 h-6 object-cover rounded-full"
                    src={
                      `${import.meta.env.VITE_API_URL}/uploads/${
                        user?.picture
                      }` ||
                      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    }
                  />
                  <h1>{user?.name}</h1>
                  <span>@</span>
                  <span className="">{getTimeAgo(item?.createdAt)}</span>
                  {item?.privacy == "private" ? (
                    <FaLock size={20} className="text-red-500" />
                  ) : (
                    <MdOutlinePublic className="text-blue-600" size={20} />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h1 className="text-2xl font-bold">{item?.title}</h1>
                  </div>
                  <div>
                    <img
                      className="w-28 h-28 rounded-xl"
                      src={`${import.meta.env.VITE_API_URL}/uploads/${
                        item?.banner
                      }`}
                      alt="Blog Banner"
                    />
                  </div>
                </div>
              </Link>
              <div className="flex items-center space-x-6">
                <button className="bg-gray-400 px-5 py-1 rounded-full font-semibold">
                  {item?.category}
                </button>
                {/* <div className="flex space-x-1">
                  <IoMdHeartEmpty size={25} className="cursor-pointer" />
                  <span className="font-semibold">{item?.likes}</span>
                </div> */}
                <Link
                  to={`/updateBlog/${item?._id}`}
                  className="bg-blue-400 px-5 py-1 rounded-full font-semibold cursor-pointer"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteBlog(item?._id, "user")}
                  className="bg-red-400 px-5 py-1 rounded-full font-semibold cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-semibold text-gray-500">
              No blogs found. Start writing your first blog!
            </h1>
          </div>
        )}
      </div>
      <div className="w-[35%] px-10 py-10 overflow-hidden space-y-4 text-lg text-gray-700 font-semibold">
        {user?.picture ? (
          <img
            src={`${import.meta.env.VITE_API_URL}/uploads/${user?.picture}`}
            alt="user"
            className="w-40 object-fill h-40 rounded-full "
          />
        ) : (
          <RiAccountCircleFill size={23} />
        )}
        <h1 className="font-bold text-xl">
          @<span className="underline">{user?.username}</span>
        </h1>
        <p>{user?.name}</p>
        <p>{blogs?.length} - Blogs</p>
        <p>Joined on {getTimeAgo(user?.createdAt)}</p>
        <div className="flex space-x-4">
          <button onClick={handleLogout} className="btn-center space-x-1.5">
            <RiLogoutBoxRLine />
            <span>Logout</span>
          </button>
          <Link to={"/EditProfile"} className="btn-center space-x-1.5">
            <MdModeEdit />
            <span>Edit Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
