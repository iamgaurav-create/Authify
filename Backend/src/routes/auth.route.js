import express from "express";
import { forgotPassword, Login, Logout, resetPassword, Signup, verifyOTP } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", Signup);

router.post("/login", Login);

router.post("/logout", Logout);

router.post("/otp", verifyOTP);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);


export default router;