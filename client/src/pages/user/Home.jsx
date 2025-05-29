import useBlogStore from "../../store/useBlogStore";
import { useEffect, useState } from "react";
import Blog from "../../components/Blog";
import { useLocation } from "react-router-dom";
import Model from "../../components/Model";

const Home = () => {
  const { fetchAllBlogs, allBlogs } = useBlogStore();
  const [data, setData] = useState([]);
  const { search } = useLocation();
  const searchParam = new URLSearchParams(search).get("search");

  // Fetch blogs on mount
  useEffect(() => {
    const loadBlogs = async () => {
      await fetchAllBlogs(); // ensure blogs are fetched before using
    };
    loadBlogs();
  }, []);

  // Filter blogs based on search param
  useEffect(() => {
    if (searchParam) {
      const filtered = allBlogs.filter(
        (a) =>
          a?.title?.toLowerCase().includes(searchParam.toLowerCase()) ||
          a?.category?.toLowerCase() == searchParam.toLowerCase() ||
          a?.userId?.username.toLowerCase() == searchParam.toLowerCase() ||
          a?.userId?.name.toLowerCase() == searchParam.toLocaleLowerCase()
      );
      setData(filtered);
    } else {
      setData(allBlogs);
    }
  }, [allBlogs, searchParam]);

  return (
    <div className="flex w-full">
      <div className="w-full px-10 py-5">
        {data.map((item) => (
          <Blog key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
