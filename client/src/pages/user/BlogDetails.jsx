import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../instance/axiosInstance";
import { toast } from "react-hot-toast";
import getTimeAgo from "../../utils/getTimeAgo";
import { FaLock } from "react-icons/fa6";
import { MdOutlinePublic } from "react-icons/md";
import ErrorPage from "../admin/components/ErrorPage";

const BlogDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("Not Found");

  useEffect(() => {
    const fetchBlogDetails = async () => {
      setIsLoading(true);
      try {
        let res = await axiosInstance.get(`/blog/${id}`);

        if (res.data.success) {
          setData(res.data.blog);
          setIsLoading(false);
        } else {
          toast.error("Blog not found");
          setIsError(res.data.message);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        setIsError(error.response.data.message);
        toast.error(error.response.data.message || "Some Error Occure");
      }
    };

    fetchBlogDetails();
  }, [id]);

  return (
    <>
      {data && !isLoading ? (
        <div className="py-5">
          <h1 className="text-3xl font-bold my-3">{data?.title}</h1>
          <div className="border-t border-b border-gray-300 px-5 py-3">
            <div className="flex items-center justify-between text-gray-700 font-semibold">
              <div className="flex items-center space-x-5">
                <img
                  className="w-8 h-8"
                  src={`${import.meta.env.VITE_API_URL}/uploads/${
                    data?.userId?.picture
                  }`}
                  alt="User Avatar"
                />

                <div className="flex flex-col">
                  <h1>{data?.userId?.name}</h1>
                  <Link
                    to={`/user/${data?.userId?.username}`}
                    className="cursor-pointer"
                  >
                    {" "}
                    @<span className="underline">{data?.userId?.username}</span>
                  </Link>
                </div>
                <div>
                  {data?.privacy == "private" ? (
                    <FaLock size={20} className="text-red-500" />
                  ) : (
                    <MdOutlinePublic className="text-blue-600" size={20} />
                  )}
                </div>
              </div>
              <div>
                <p>Published on {getTimeAgo(data?.createdAt)}</p>
              </div>
            </div>
          </div>
          <div>
            <img
              className="w-full h-96 my-5 object-fill"
              src={`${import.meta.env.VITE_API_URL}/uploads/${data?.banner}`}
              alt="Blog Banner"
            />

            <div dangerouslySetInnerHTML={{ __html: data?.description }} />
          </div>
        </div>
        
      ) : (
        <ErrorPage to={"/"} message={isError} label={"Back To Home"}/>
      )}
    </>
  );
};

export default BlogDetails;
