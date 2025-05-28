import { create } from "zustand";
import axiosInstance from "../instance/axiosInstance";
import { toast } from "react-hot-toast";

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  clearUser: () => set({ user: null, isAuthenticated: false }),
  loginUser: async (userData) => {
    try {
      let res = await axiosInstance.post("/auth/login", userData);
      if (res.data.success) {
        set({ user: res.data.user, isAuthenticated: true });
        return true;
      } else {
        toast.error(res.data.message || "Login failed");
        return false;
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during login"
      );
      return false;
    }
  },
  registerUser: async (userData) => {
    try {
      let res = await axiosInstance.post("/auth/register", userData);
      if (res.data.success) {
        set({ user: res.data.user, isAuthenticated: true });
        toast.success("Registration successful");
        return true;
      } else {
        toast.error(res.data.message || "Registration failed");
        return false;
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during registration"
      );
      return false;
    }
  },
  checkAuth: async () => {
    try {
      let res = await axiosInstance.get("/auth/check-auth");
      if (res.data.success) {
        set({ user: res.data.user, isAuthenticated: true });
        return true;
      } else {
        set({ user: null, isAuthenticated: false });
        return false;
      }
    } catch (error) {
      set({ user: null, isAuthenticated: false });
      return false;
    }
  },
  logout: async () => {
    try {
      let res = await axiosInstance.post("/auth/logout");
      if (res.data.success) {
        set({ user: null, isAuthenticated: false });
        toast.success("Logout successful");
        return true;
      } else {
        toast.error(res.data.message || "Logout failed");

        return false;
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during logout"
      );

      return false;
    }
  },
  updateProfile: async (userData) => {
    try {
      let res = await axiosInstance.put("/auth/update-profile", userData);
      if (res.data.success) {
        set({ user: res.data.user });
        toast.success("Profile updated successfully");
        return true;
      } else {
        toast.error(res.data.message || "Profile update failed");
        return false;
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred during profile update"
      );
      return false;
    }
  },
}));

export default useAuthStore;
