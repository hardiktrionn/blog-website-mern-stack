import { useEffect, useState } from "react";
import useDashBoardStore from "../../store/useDashBoardStore";
import useBlogStore from "../../store/useBlogStore";
import getTimeAgo from "../../utils/getTimeAgo";
import { FaRegEdit } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import useDeletemodelStore from "../../store/useDeletemodelStore";
import Model from "../../components/Model";
import SearchInput from "../../components/SearchInput";

const Blogs = () => {
  const { setCurrentPage, currentPage } = useDashBoardStore();
  const { allBlogs, deleteBlog, fetchAllBlogs } = useBlogStore();
  const [data, setData] = useState(allBlogs);
  const [search, setSearch] = useState("");
  const { openDeleteModal, itemToDelete, isDeleteModalOpen, closeDeleteModal } =
    useDeletemodelStore();

  useEffect(() => {
    if (currentPage !== "blogs") {
      setCurrentPage("blogs");
    }

    fetchAllBlogs();
  }, []);

  useEffect(() => {
    setData(allBlogs);
  }, [allBlogs]);

  useEffect(() => {
    const time = setTimeout(() => {
      filterData();
    }, 300);

    return () => {
      clearTimeout(time);
    };
  }, [search]);

  const filterData = () => {
    if (allBlogs.length) {
      let res = allBlogs.filter(
        (a) =>
          a?.title?.toLowerCase().includes(search.toLocaleLowerCase()) ||
          a?.category?.toLowerCase().includes(search.toLocaleLowerCase()) ||
          a?.username?.toLowerCase().includes(search.toLocaleLowerCase())
      );

      setData(res);
    }
  };

  return (
    <div className="">
      <div className="w-[30%] py-2">
        <SearchInput value={search} setValue={setSearch} />
      </div>
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
          {data.length != 0 ? (
            data.map((item, i) => (
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
                      onClick={() => openDeleteModal(item?._id, "admin")}
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
      {isDeleteModalOpen && itemToDelete && (
        <Model
          onDelete={() => {
            deleteBlog(itemToDelete, "admin");
            closeDeleteModal();
          }}
        />
      )}
    </div>
  );
};

export default Blogs;
