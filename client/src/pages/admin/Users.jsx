import { useEffect, useState } from "react";
import useDashBoardStore from "../../store/useDashBoardStore";
import axiosInstance from "../../instance/axiosInstance";
import { FaRegEdit } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";
import getTimeAgo from "../../utils/getTimeAgo";
import { toast } from "react-hot-toast";
import useBlogStore from "../../store/useBlogStore";
import { Link } from "react-router-dom";
import useDeletemodelStore from "../../store/useDeletemodelStore";
import Model from "../../components/Model";
import SearchInput from "../../components/SearchInput";

const Users = () => {
  const { setCurrentPage, currentPage, users, setUsers, fetchUsers } =
    useDashBoardStore();
  const { allBlogs, setAllBlogs } = useBlogStore();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const { openDeleteModal, itemToDelete, isDeleteModalOpen, closeDeleteModal } =
    useDeletemodelStore();

  useEffect(() => {
    if (currentPage !== "users") {
      setCurrentPage("users");
    }
    const loadBlogs = async () => {
      await fetchUsers();
      setData(users);
    };
    loadBlogs();
  }, []);

  useEffect(() => {
    const time = setTimeout(() => {
      filterData();
    }, 300);

    return () => {
      clearTimeout(time);
    };
  }, [search]);

  const filterData = () => {
    let res = users.filter(
      (a) =>
        a?.name?.toLowerCase().includes(search.toLocaleLowerCase()) ||
        a?.email?.toLowerCase().includes(search.toLocaleLowerCase()) ||
        a?.username?.toLowerCase().includes(search.toLocaleLowerCase()) ||
        a?.blogs?.length == search
    );

    setData(res);
  };

  const deleteUser = async (id) => {
    try {
      let res = await axiosInstance.delete(`/admin/users/${id}`);

      if (res.data.success) {
        let userfilter = users.filter((a) => a._id != id);

        let blogFilter = allBlogs.filter((a) => a.userId._id != id);
        setUsers(userfilter);
        setAllBlogs(blogFilter);
        toast.success("Delete The User");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Some Error Occure");
    }
  };

  return (
    <div>
      <div className="w-[30%] py-2">
        <SearchInput value={search} setValue={setSearch} />
      </div>
      <table className=" bg-white w-full rounded-md border border-gray-200">
        <thead className="bg-gray-200 ">
          <tr className="rounded-2xl">
            {["Name", "Email", "Username", "Blogs", "Joined At", "Actions"].map(
              (item, i) => (
                <th
                  key={i}
                  className="p-4 text-left text-[13px] font-medium text-slate-700"
                >
                  {item}
                </th>
              )
            )}
          </tr>
        </thead>

        <tbody className="whitespace-nowrap w-full">
          {data.length !== 0 ? (
            data.map((item, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-4 text-[15px] text-slate-900 font-medium">
                  {item?.name}
                </td>
                <td className="p-4 text-[15px] text-slate-600 font-medium">
                  {item?.email}
                </td>
                <td className="p-4 text-[15px] text-slate-600 font-medium">
                  {item?.username}
                </td>
                <td className="p-4 text-[15px] text-slate-600 font-medium">
                  {item?.blogs.length}
                </td>
                <td className="p-4 text-[15px] text-slate-600 font-medium">
                  {getTimeAgo(item?.createdAt)}
                </td>
                <td className="p-4">
                  <div className="flex items-center">
                    <Link
                      to={`edit/${item?.username}`}
                      className="mr-3 cursor-pointer"
                      title="Edit"
                    >
                      <FaRegEdit size={24} className="text-blue-500" />
                    </Link>
                    <button
                      onClick={() => openDeleteModal(item?._id)}
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
            <tr
              colSpan={5}
              className="text-center w-full flex items-center justify-center"
            >
              <td>No User</td>
            </tr>
          )}
        </tbody>
      </table>
      {isDeleteModalOpen && itemToDelete && (
        <Model
          onDelete={() => {
            deleteUser(itemToDelete, "admin");
            closeDeleteModal();
          }}
        />
      )}
    </div>
  );
};

export default Users;
