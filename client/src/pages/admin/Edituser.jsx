import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../instance/axiosInstance";
import { MdOutlinePublic } from "react-icons/md";
import getTimeAgo from "../../utils/getTimeAgo";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import BackButton from "../../components/BackButton";
import ErrorPage from "./components/ErrorPage";
import Inputbox from "../../components/Inputbox";
import errorSeperate from "../../utils/errorSeperate";
import Button from "../../components/Button";

const Edituser = () => {
  const { username } = useParams();
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newPicture, setNewPicture] = useState("");
  const [error, setError] = useState({});

  useEffect(() => {
    fetchData();
  }, [username]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      let res = await axiosInstance.get(`/auth/seen/${username}`);
      setIsLoading(false);
      if (res.data.success) {
        setData(res.data.user);
        setName(res.data.user.name);
        setEmail(res.data.user.email);
      } else {
        
        setData("");
        toast.error(res.data.message);
      }
    } catch (error) {
      setData("");
      setIsLoading(false);
      toast.error(error.response?.data?.message || "Some Error Occure");
    }
  };

  const handleUpdateProfile = async () => {
    let formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("username", username);
    if (newPicture) {
      formData.append("file", newPicture);
    }

    try {
      let res = await axiosInstance.put(
        `/auth/update-profile/${data?._id}`,
        formData
      );
      if (res.data.success) {
        toast.success("Profile updated successfully");
      } else {
        fetchData();
        toast.error(res.data.message || "Profile update failed");
      }
    } catch (error) {
      fetchData();
      if (error.response) {
        let res = errorSeperate(error);
        setError(res);
      }
    }
  };
  return (
    <>
      {data && !isLoading ? (
        <div className="flex h-[90vh]">
          <div className="w-[65%] px-10 py-10 overflow-y-auto">
            <BackButton to={"/Admin/users"} />
            <div className="border-b-2 border-gray-300 py-5 mb-5">
              <h1 className="text-3xl font-bold">{username} Blogs</h1>
            </div>
            {data?.blogs?.length > 0 ? (
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
                    {/* <div className="flex space-x-1">
                  <IoMdHeartEmpty size={25} className="cursor-pointer" />
                  <span className="font-semibold">{item?.likes}</span>
                </div> */}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center">
                <h1 className="text-2xl font-semibold text-gray-500">
                  No blogs found.
                </h1>
              </div>
            )}
          </div>
          <div className="w-[35%] px-10 py-10 overflow-hidden space-y-4 text-lg text-gray-700 font-semibold">
            <div className="space-y-2">
              <div className="flex items-center justify-center mb-4">
                <label
                  htmlFor="picture"
                  className="cursor-pointer text-sm text-gray-600 hover:text-gray-800"
                >
                  {newPicture ? (
                    <img
                      src={URL.createObjectURL(newPicture)}
                      alt="New Profile"
                      className="w-28 h-28 object-cover rounded-full"
                    />
                  ) : (
                    <img
                      className="w-28 h-28 object-cover rounded-full"
                      src={`${import.meta.env.VITE_API_URL}/uploads/${
                        data?.picture
                      }`}
                      alt={`picture`}
                    />
                  )}
                  <input
                    type="file"
                    className="hidden"
                    id="picture"
                    accept="image/*"
                    onChange={(e) => setNewPicture(e.target.files[0])}
                  />
                  {data?.picture?.name || "Upload Profile Picture"}
                </label>
              </div>
              <Inputbox
                label={"Name *"}
                type={"text"}
                placeholder={"Your Name"}
                value={name}
                setValue={setName}
                error={error?.name}
              />
              <Inputbox
                label={"Username *"}
                type={"text"}
                placeholder={"Your Username"}
                value={username}
                readOnly={true}
                error={error?.username}
              />
              <Inputbox
                label={"Email *"}
                type={"email"}
                placeholder={"Your@gmail.com"}
                value={email}
                readOnly={true}
                setValue={setEmail}
                error={error?.email}
              />

              <Button
                onClick={handleUpdateProfile}
                loading={isLoading}
                label={"Update Profile"}
                loadinglabel={"Updating"}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <ErrorPage
            to={"/Admin/users"}
            message={"User Not Found"}
            label={"Back"}
          />
        </div>
      )}
    </>
  );
};

export default Edituser;
