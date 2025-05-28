import { create } from "zustand";
import axiosInstance from "../instance/axiosInstance";

const useDashBoardStore = create((set, get) => ({
  currentPage: "",
  setCurrentPage: (currentPage) => {
    set({ currentPage });
  },
  users: [],
  setUsers: (users) => {
    set({ users });
  },
  fetchUsers: async () => {
    try {
      let res = await axiosInstance.get("/admin/users");

      if (res.data.success) {
        set({ users: res.data.users });
      } else {
        set({ users: [] });
      }
    } catch (error) {
      set({ users: [] });
    }
  },
}));

export default useDashBoardStore;
