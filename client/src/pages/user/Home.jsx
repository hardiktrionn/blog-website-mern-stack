import { IoMdHeartEmpty } from "react-icons/io";
import { Link } from "react-router-dom";
import useBlogStore from "../../store/useBlogStore";
import { useEffect } from "react";
import getTimeAgo from "../../utils/getTimeAgo";
import Blog from "../../components/Blog";

const Home = () => {
  const { fetchAllBlogs, allBlogs } = useBlogStore();

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  return (
    <div className="flex  w-full">
      <div className="w-full px-10 py-5">
        {allBlogs.map((item) => (
          <Blog key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
