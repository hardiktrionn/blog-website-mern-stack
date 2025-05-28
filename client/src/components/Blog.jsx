import { Link } from "react-router-dom";
import getTimeAgo from "../utils/getTimeAgo";

const Blog = ({ item }) => {
  return (
    <div className="border-b-2 border-gray-300 py-5">
      <Link to={`/blog/${item?._id}`}>
        <div className="flex items-center space-x-2 font-semibold">
          <img
            className="w-6 h-6 rounded-full object-cover"
            src={
              `${import.meta.env.VITE_API_URL}/uploads/${
                item?.userId?.picture
              }` || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
          />
          <h1>{item?.userId?.name}</h1>
          <span>@</span>
          <span className="">{getTimeAgo(item?.createdAt)}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{item?.title}</h1>
          </div>
          <div>
            <img
              className="w-28 h-28 rounded-xl"
              src={`${import.meta.env.VITE_API_URL}/uploads/${item?.banner}`}
            />
          </div>
        </div>
      </Link>
      <div className="flex items-center space-x-6">
        <button className="bg-gray-400 px-3 py-1 rounded-full font-semibold">
          {item.category}
        </button>
        {/* <div className="flex space-x-1">
                    <IoMdHeartEmpty size={25} />
                    <span className="font-semibold">{item.likes}</span>
                  </div> */}
      </div>
    </div>
  );
};

export default Blog;
