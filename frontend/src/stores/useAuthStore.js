import { create } from "zustand";
import { axiosInstance } from "../utils/axiosInstance.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  leaderboardData: [], // Leaderboard data fetched from the backend, initially set to null,
  isSigninUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,
  isFetchingUser: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axiosInstance.get("users/check");
      set({ authUser: response.data.user });
    } catch (error) {
      console.log("checkAuth error", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigninUp: true });
    try {
      const res = await axiosInstance.post("users/signup", data);
      set({ authUser: res.data.newUser });
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error signing up", error);
      toast.error("Error signing up");
    } finally {
      set({ isSigninUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("users/login", data);
      set({ authUser: res.data.user });
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error logging in", error);
      toast.error("Error logging in");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("users/logout");
      set({ authUser: null });
      toast.success("Logout successful");
    } catch (error) {
      console.log("Error logging out", error);
      toast.error("Error logging out");
      toast.error("Please allow cookies in your browser settings");
    }
  },

  getLeaderboard: async () => {
    set({ isFechingUser: true });
    try {
      const res = await axiosInstance.get("users/leaderboard");
      set({ leaderboardData: res.data.users });
    } catch (error) {
      console.log("Error fetching leaderboard", error);
      toast.error("Error fetching leaderboard");
      set({ isFechingUser: false });
    } finally {
      set({ isFechingUser: false });
    }
  },
}));
