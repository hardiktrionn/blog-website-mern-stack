import { useEffect } from "react";
import useDashBoardStore from "../../store/useDashBoardStore";
import axiosInstance from "../../instance/axiosInstance";
import { FaRegEdit } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";
import getTimeAgo from "../../utils/getTimeAgo";
import { toast } from "react-hot-toast";
import useBlogStore from "../../store/useBlogStore";
import { Link } from "react-router-dom";

const Users = () => {
  const { setCurrentPage, currentPage, users, setUsers ,fetchUsers} = useDashBoardStore();
  const { allBlogs, setAllBlogs } = useBlogStore();

  useEffect(() => {
    if (currentPage !== "users") {
      setCurrentPage("users");
    }
    fetchUsers();
  }, []);

  

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
      <table className=" bg-white w-full rounded-md border border-gray-200">
        <thead className="bg-gray-200 ">
          <tr className="rounded-2xl">
            <th className="p-4 text-left text-[13px] font-semibold text-slate-900">
              Name
            </th>
            <th className="p-4 text-left text-[13px] font-semibold text-slate-900">
              Email
            </th>
            <th className="p-4 text-left text-[13px] font-semibold text-slate-900">
              UserName
            </th>
            <th className="p-4 text-left text-[13px] font-semibold text-slate-900">
              Joined At
            </th>
            <th className="p-4 text-left text-[13px] font-semibold text-slate-900">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="whitespace-nowrap w-full">
          {users.length !== 0 ? (
            users.map((item, i) => (
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
                      onClick={() => deleteUser(item?._id)}
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
    </div>
  );
};

export default Users;
