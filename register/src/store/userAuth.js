import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import Verify from "../pages/Verify.jsx";

export const userAuthStore = create((set) => ({
  authUser: JSON.parse(localStorage.getItem("authUser")) || null, // load from localStorage
  isSignup: false,
  isLoggingIn: false,
  isVerifying: false,

  signup: async (data, navigate) => {
    set({ isSignup: true });
    try {
      await axiosInstance.post("/auth/signup", data);
      toast.success("OTP sent to your email. Please verify.");

      navigate("/verify", { state: { email: data.email } });
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSignup: false });
    }
  },

  verifyOTP: async (email, otp, navigate) => {
    set({ isVerifying: true });
    try {
      const res = await axiosInstance.post("/auth/otp", { email, otp });
      toast.success(res.data.message);

      navigate("/login"); 
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    } finally {
      set({ isVerifying: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      localStorage.setItem("authUser", JSON.stringify(res.data)); 
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      localStorage.removeItem("authUser"); 
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },
}));
