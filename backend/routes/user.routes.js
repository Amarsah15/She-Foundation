import express from "express";
import {
  login,
  signUp,
  getUser,
  getLeaderboard,
  logout,
  getAllUsers,
  check,
} from "../controllers/user.controller.js";
import { auth, isAdmin } from "../middlewares/auth.middleware.js";

const userRoutes = express.Router();

userRoutes.get("/getUserDetails", auth, getUser);
userRoutes.get("/leaderboard", auth, getLeaderboard);
userRoutes.post("/login", login);
userRoutes.post("/signup", signUp);
userRoutes.post("/logout", auth, logout);
userRoutes.get("/getAllUsers", auth, isAdmin, getAllUsers);
userRoutes.get("/check", auth, check);

export default userRoutes;
