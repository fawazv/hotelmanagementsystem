import express from "express";
import {
  login,
  profile,
  register,
  registerAdminAccount,
  resetPassword,
} from "../controllers/authController";
import authMiddleware from "../middleware/authMiddleware";
// import validateRequest from "../middleware/validateRequest.js";
// import { registerSchema } from "../validators/authValidator.js";

const router = express.Router();

router.post("/register", register);
router.post("/create-admin", authMiddleware, registerAdminAccount);
router.post("/login", login);
router.get("/profile", authMiddleware, profile);
router.patch("/resetpassword", authMiddleware, resetPassword);

export default router;
// validateRequest(registerSchema, "body")
