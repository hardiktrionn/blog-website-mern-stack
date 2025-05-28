import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../instance/axiosInstance";
import { FaLock } from "react-icons/fa";
import { MdOutlinePublic } from "react-icons/md";
import getTimeAgo from "../../utils/getTimeAgo";
import { RiAccountCircleFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ErrorPage from "../admin/components/ErrorPage";

const UserDetails = () => {
  const { username } = useParams();
  const [data, setData] = useState(null);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      let res = await axiosInstance.get(`/auth/seen/${username}`);
      if (res.data.success) {
        setData(res.data.user);
      } else {
        setIsNotFound(true);
        toast.error(res.data.message);
      }
    } catch (error) {
      setIsNotFound(true);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      {isNotFound ? (
        <ErrorPage to={"/"} message={"User not found"} label={"Back to Home"} />
      ) : (
        <div className="flex h-[90vh]">
          <div className="w-[65%] px-10 py-10 overflow-y-auto">
            <div className="border-b-2 border-gray-300 py-5 mb-5">
              <h1 className="text-3xl font-bold">My Blogs</h1>
            </div>
            {data?.blogs.length > 0 ? (
              data?.blogs.map((item, i) => (
                <div key={i} className="border-b-2 border-gray-300 py-5">
                  <Link to={`/blog/${item?._id}`}>
                    <div className="flex items-center space-x-2 font-semibold">
                      <img
                        className="w-6 h-6"
                        src={
                          `${import.meta.env.VITE_API_URL}/uploads/${
                            data?.picture
                          }` ||
                          "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        }
                      />
                      <h1>{data?.name}</h1>
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
                          className="w-28 h-28"
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
            {data?.picture ? (
              <img
                src={`${import.meta.env.VITE_API_URL}/uploads/${data?.picture}`}
                alt="user"
                className="w-40 object-fill h-40 rounded-full "
              />
            ) : (
              <RiAccountCircleFill size={23} />
            )}
            <h1 className="font-bold text-xl">
              @<span className="underline">{data?.username}</span>
            </h1>
            <p>{data?.name}</p>
            <p>{data?.blogs?.length} - Blogs</p>
            <p>Joined on {getTimeAgo(data?.createdAt)}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDetails;
