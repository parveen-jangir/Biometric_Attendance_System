import express from "express";
import { signup, verifyOtp, login, forgetPassword, confirmNewPassword } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.post("/forget-password", forgetPassword);
router.post("/confirm-newpassword", confirmNewPassword);

export default router;
