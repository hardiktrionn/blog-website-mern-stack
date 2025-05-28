import { useEffect } from "react";
import useDashBoardStore from "../../store/useDashBoardStore";
import useBlogStore from "../../store/useBlogStore";
import getTimeAgo from "../../utils/getTimeAgo";
import { FaRegEdit } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";

const Blogs = () => {
  const { setCurrentPage, currentPage } = useDashBoardStore();
  const { allBlogs, deleteBlog, fetchAllBlogs } = useBlogStore();

  useEffect(() => {
    if (currentPage !== "blogs") {
      setCurrentPage("blogs");

      fetchAllBlogs();
    }
  }, []);

  return (
    <div className="">
      <table className=" bg-white w-full rounded-md border border-gray-200">
        <thead className="bg-gray-200 ">
          <tr className="rounded-2xl">
            <th className="p-4 text-left text-[13px] font-semibold text-slate-900">
              Title
            </th>
            <th className="p-4 text-left text-[13px] font-semibold text-slate-900">
              UserName
            </th>
            <th className="p-4 text-left text-[13px] font-semibold text-slate-900">
              Category
            </th>
            <th className="p-4 text-left text-[13px] font-semibold text-slate-900">
              Upload At
            </th>
            <th className="p-4 text-left text-[13px] font-semibold text-slate-900">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="whitespace-nowrap">
          {allBlogs.length != 0 ? (
            allBlogs.map((item, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-4 text-[15px] text-slate-900 font-medium">
                  {item?.title}
                </td>
                <td className="p-4 text-[15px] text-slate-600 font-medium">
                  {item?.userId?.username}
                </td>
                <td className="p-4 text-[15px] text-slate-600 font-medium">
                  {item?.category}
                </td>
                <td className="p-4 text-[15px] text-slate-600 font-medium">
                  {getTimeAgo(item?.createdAt)}
                </td>
                <td className="p-4">
                  <div className="flex items-center">
                    <Link
                      to={`edit/${item?._id}`}
                      className="mr-3 cursor-pointer"
                      title="Edit"
                    >
                      <FaRegEdit size={24} className="text-blue-500" />
                    </Link>
                    <button
                      onClick={() => deleteBlog(item?._id, "admin")}
                      title="Delete"
                      className="cursor-pointer"
                    >
                      <BiTrash size={24} className="text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <th>No Blogs</th>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Blogs;
