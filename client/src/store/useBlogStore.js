import { create } from "zustand";
import axiosInstance from "../instance/axiosInstance";
import toast from "react-hot-toast";

const useBlogStore = create((set) => ({
  blogs: [],
  loading: false,
  allBlogs: [],
  setAllBlogs: (allBlogs) => {
    set({ allBlogs });
  },
  isLoadingallBlogs: false,
  fetchAllBlogs: async () => {
    set({ isLoadingallBlogs: true, allBlogs: [] });
    try {
      const res = await axiosInstance.get("/blog/all");
      set({ allBlogs: res.data.blogs, isLoadingallBlogs: false });
      return true;
    } catch (error) {
      set({ isLoadingallBlogs: false });

      return false;
    }
  },
  fetchBlogs: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/blog/user");
      set({ blogs: res.data.blogs, loading: false });

      return true;
    } catch (error) {
      set({
        loading: false,
      });
      return false;
    }
  },
  createBlog: async (formData) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.post("/blog/create", formData);
      set((state) => ({
        blogs: [...state.blogs, res.data.blog],
        loading: false,
      }));
      toast.success("Blog created successfully");
      return true;
    } catch (error) {
      set({
        loading: false,
      });
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to create blog");
      return false;
    }
  },
  deleteBlog: async (id, role) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/blog/delete/${id}`);
      if (role == "admin") {
        set((state) => ({
          allBlogs: state.allBlogs.filter((blog) => blog._id !== id),
          loading: false,
        }));
      } else {
        set((state) => ({
          blogs: state.blogs.filter((blog) => blog._id !== id),
          loading: false,
        }));
      }
      toast.success("Blog deleted successfully");
      return true;
    } catch (error) {
      set({
        loading: false,
      });
      toast.error(error.response?.data?.message || "Failed to delete blog");
      return false;
    }
  },
  fetchSingleBlog: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(`/blog/${id}`);
      set({ loading: false });
      return res.data.blog;
    } catch (error) {
      set({
        loading: false,
      });
      toast.error(error?.response?.data?.message || "Failed to fetch blog");
      return null;
    }
  },
  updateBlog: async (id, formData) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.put(`/blog/update/${id}`, formData);
      set((state) => ({
        blogs: state.blogs.map((blog) =>
          blog._id === id ? res.data.blog : blog
        ),
        loading: false,
      }));
      toast.success("Blog updated successfully");
      return true;
    } catch (error) {
      set({
        loading: false,
      });
      toast.error(error?.response?.data?.message || "Failed to update blog");
      return false;
    }
  },
}));
export default useBlogStore;
