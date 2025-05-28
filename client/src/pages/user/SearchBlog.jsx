import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../instance/axiosInstance";
import { useEffect, useState } from "react";
import Blog from "../../components/Blog";
import ErrorPage from "../admin/components/ErrorPage";

const SearchBlog = () => {
  const { search } = useLocation();
  const [data, setData] = useState([]);
  const searchParam = new URLSearchParams(search).get("search");

  useEffect(() => {
    fetchBlog();
  }, [searchParam]);

  const fetchBlog = async () => {
    try {
      let res = await axiosInstance.get(`blog?search=${searchParam}`);

      if (res.data.success) {
        setData(res.data.data);
      } else {
        setData([]);
        toast.error(res.data.message);
      }
    } catch (error) {
      setData([]);
      toast.error(error?.response?.data?.message || "Some Error Ocuure");
    }
  };

  return (
    <div>
      {data.length > 0 ? (
        data.map((item) => <Blog key={item._id} item={item} />)
      ) : (
        <ErrorPage to={"/"} message={"Not Found"} label={"Back to Home"} />
      )}
    </div>
  );
};

export default SearchBlog;
