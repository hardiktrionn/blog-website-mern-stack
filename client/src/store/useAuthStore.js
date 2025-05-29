import { create } from "zustand";
import axiosInstance from "../instance/axiosInstance";
import { toast } from "react-hot-toast";
import errorSeperate from "../utils/errorSeperate";

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  clearUser: () => set({ user: null, isAuthenticated: false }),
  loginUser: async (userData) => {
    try {
      let res = await axiosInstance.post("/auth/login", userData);
      if (res.data.success) {
        toast.success("Login successful");
        set({ user: res.data.user, isAuthenticated: true });
        return false;
      } else {
        toast.error(res.data.message || "Login failed");
        return true;
      }
    } catch (error) {
      if (error.response) {
        let err = errorSeperate(error);
        return err;
      }
      return true;
    }
  },
  registerUser: async (userData) => {
    try {
      let res = await axiosInstance.post("/auth/register", userData);
      if (res.data.success) {
        set({ user: res.data.user, isAuthenticated: true });
        toast.success("Registration successful");
        return false;
      } else {
        toast.error(res.data.message || "Registration failed");
        return true;
      }
    } catch (error) {
      if (error.response) {
        let err = errorSeperate(error);
        return err;
      }

      return true;
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
        return false;
      } else {
        toast.error(res.data.message || "Profile update failed");
        return true;
      }
    } catch (error) {
      if (error.response) {
        let err = errorSeperate(error);
        return err;
      }
      return true;
    }
  },
  changePassword: async (data) => {
    try {
      let res = await axiosInstance.put("/auth/update-password", data);
      if (res.data.success) {
        toast.success("Password updated successfully");
        return false;
      } else {
        toast.error(res.data.message || "Password update failed");
        return true;
      }
    } catch (error) {
      if (error.response) {
        let err = errorSeperate(error);
        return err;
      }
      return true;
    }
  },
  newPassword: async (data) => {
    try {
      let res = await axiosInstance.post("/auth/new-password", data);
      if (res.data.success) {
        toast.success("Password updated successfully");
        return false;
      } else {
        toast.error(res.data.message || "Password update failed");
        return true;
      }
    } catch (error) {
      if (error.response) {
        let err = errorSeperate(error);
        return err;
      }
      return true;
    }
  },
}));

export default useAuthStore;
